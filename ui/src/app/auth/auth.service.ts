import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ErrorHandler } from '../shared/model/error-handler';
import { HttpUtils } from '../shared/support/http.utils';
import { AuthServiceInterface } from './auth.service.interface';
import { LoginRequest } from './model/login-request.model';
import { User } from './model/user.model';

/**
 * The AuthService deals with all security-related services:
 *
 * - Login
 * - Logout
 * - Loading of security meta-information
 *
 * @author Gunnar Hillert
 */
@Injectable()
export class AuthService implements AuthServiceInterface {

  private authenticationUrl = '/api/authenticate';
  private logoutUrl = '/api/logout';

  private readonly xAuthTokenKeyName = 'xAuthToken';

  public readonly user$ = new BehaviorSubject<User>(new User(false, '', []));
  public xAuthToken = '';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler) {
  }

  getUser(): User {
    return this.user$.getValue();
  }

  restoreSecurity(): Observable<User> {
    console.log('Restoring security…');
    this.xAuthToken = this.retrievePersistedXAuthToken();
    this.user$.next(new User(false, 'Restored', []));
    return Observable.of(new User(false, '', []));
  }

  /**
   * Logs in a user based on the provided {@link LoginRequest}. If the login
   * was successful, the retrieved xAuthToken will be persisted (Session
   * Storage) and the the xAuthToken will also be set in
   * {@link SecurityAwareRequestOptions}. Upon login a {@link SecurityInfo}
   * will be returned.
   *
   * @param loginRequest The login-request holding username and password
   */
  login(loginRequest: LoginRequest): Observable<void> {
    console.log(`Logging in user ${loginRequest.username}.`);

    return this.http.post(this.authenticationUrl, JSON.stringify(loginRequest), {
      headers: HttpUtils.getDefaultRequestHeaders()
    })
    .map((response: any) => {
        this.xAuthToken = response.token;
        this.persistXAuthToken(this.xAuthToken);
        const user = new User(true, response.username, response.roles2);
        this.user$.next(user);
        return user;
    })
    // })
    // .flatMap((id: string) => {
    //   console.log('Logging you in ...', this.options);
    //   const o: SecurityAwareRequestOptions = this.options as SecurityAwareRequestOptions;
    //   o.xAuthToken = id;
    //   this.persistXAuthToken(id);
    //   return this.loadSecurityInfo();
    // })
    .catch(this.errorHandler.handleError);
  }

  /**
   * Logs out the user. Upon logout a {@link SecurityInfo} will be
   * returned.
   */
  logout(): Observable<void> {
    console.log('Logging out ...');
    const options = HttpUtils.getDefaultRequestHeaders();
    return this.http.get(this.logoutUrl, { headers: options})
                    .map(response => {
                      this.clearLocalSecurity();
                      this.xAuthToken = null;
                      this.user$.next(new User(false, '', []));
                      return response;
                    })
                    .catch(this.errorHandler.handleError);
  }

  /**
   * Clears all security-relevant information from the local application:
   *
   * - Deletes a persisted XAuthToken (Session Storage)
   *
   */
  public clearLocalSecurity() {
    this.user$.next(new User(false, '', []));
    this.deletePersistedXAuthToken();
  }

  private retrievePersistedXAuthToken(): string {
    const token = sessionStorage.getItem(this.xAuthTokenKeyName);
    if (token) {
      return token;
    }
    return undefined;

  }

  private persistXAuthToken(token: string) {
    sessionStorage.setItem(this.xAuthTokenKeyName, JSON.stringify(token));
  }
  private deletePersistedXAuthToken() {
    sessionStorage.removeItem(this.xAuthTokenKeyName);
  }
}
