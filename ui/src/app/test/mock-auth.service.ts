import { Observable } from 'rxjs/Observable';

import { AuthServiceInterface } from '../auth/auth.service.interface';
import { LoginRequest } from '../auth/model/login-request.model';
import { User } from '../auth/model/user.model';

/**
 * Mock for AuthService.
 *
 * @author Gunnar Hillert
 */
export class MockAuthService implements AuthServiceInterface {

  login(loginRequest: LoginRequest): Observable<void> {
    throw new Error('Method not implemented.');
  }
  logout(): Observable<void> {
    throw new Error('Method not implemented.');
  }
  getUser(): User {
    return new User(false, '', []);
  }
  restoreSecurity(): Observable<User> {
    return Observable.of(new User(true, 'foo', []));
  }
  clearLocalSecurity() {
  }

}
