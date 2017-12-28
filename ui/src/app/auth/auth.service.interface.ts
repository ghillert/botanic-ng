import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { LoginRequest } from './model/login-request.model';
import { User } from './model/user.model';

export interface AuthServiceInterface {

  getUser(): User;
  restoreSecurity(): Observable<User>;
  login(loginRequest: LoginRequest): Observable<void>;
  logout(): Observable<void>;
  clearLocalSecurity();
}
