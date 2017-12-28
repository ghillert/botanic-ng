import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth.service';

// import { AuthService } from '../auth.service';

/**
 * A guard used by the router in order to check whether a the user has
 * the necessary access rights. If not, the user is redirected to the
 * login page and the original request url will be appended to the
 * 'returnUrl' query parameter.
 *
 * @author Gunnar Hillert
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  /**
   * If true the user has access to the route, if false, the user will
   * be redirected to the login url.
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const routeNeedsAuthentication = route.data.authenticate;
    const rolesNeeded: string[] = route.data.roles;
    const data = route.data;
    console.log(`Determining authorizations for ${state.url}`, route);
    if (data && data.authenticate) {
      if (this.authService.getUser().isAuthenticated) {
        console.log('authenticated >>>>>>');
        return true;
      } else {
        this.router.navigate(['login'], { queryParams: { 'returnUrl': state.url }});
        return false;
      }
    }
    // if (securityInfo.canAccess(rolesNeeded)) {
    //   return true;
    // }

    // if (securityInfo.isAuthenticationEnabled) {
    //   if (securityInfo.isAuthorizationEnabled && securityInfo.isAuthenticated) {
    //     console.log('You do not have any of the necessary role(s) ' + rolesNeeded);
    //     this.router.navigate(['roles-missing']);
    //   } else {
    //     this.router.navigate(['login'], { queryParams: { 'returnUrl': state.url }});
    //   }
    // }
    // return false;

    return true;
  }
}
