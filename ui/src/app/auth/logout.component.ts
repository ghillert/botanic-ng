import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

/**
 * Handles logouts.
 *
 * @author Gunnar Hillert
 */
@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  public busy: Subscription;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
  }

  /**
   * Logging out.
   */
  public ngOnInit() {
    if (!this.authService.getUser().isAuthenticated) {
      console.log('No need to logout. User is not authenticated.');
      this.router.navigate(['']);
      return;
    }
    console.log('Logging out ...');
    this.authService.logout().subscribe(
      result => {
        this.toastr.success('Logged out.');
        this.router.navigate(['']);
      },
      error => {
        this.toastr.error(error);
      },
    );
  }
}
