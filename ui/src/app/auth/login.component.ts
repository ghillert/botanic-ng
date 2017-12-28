import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';
import { LoginRequest } from './model/login-request.model';

/**
 * Handles application logins.
 *
 * @author Gunnar Hillert
 */
@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public user = new LoginRequest('', '');
  public busy: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
  }

  public ngOnInit() {
  }

  /**
   * Handles the login form submission.
   */
  public login() {
    let returnUrl;
    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['returnUrl']) {
      returnUrl = this.route.snapshot.queryParams['returnUrl'];
    } else {
      returnUrl = '';
    }
    this.busy = this.authService.login(this.user).subscribe(
      result => {
        console.log(`Login successful, using return Url: ${returnUrl}`);
        this.router.navigate([returnUrl]);
      },
      error => {
        this.toastr.error(error);
      });
  }
}
