import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../model/user.model';

/**
 * This directive will show or hide the element depending whether
 * any of the specified roles matches the roles assigned to "securityInfo"
 * in {@link AuthService}.
 *
 * @author Gunnar Hillert
 */
@Directive({
    selector: '[appRoles]'
})
export class RolesDirective implements AfterViewInit {

    @Input()
    public appRoles: string[];

    private existingDisplayPropertyValue: string;
    constructor(
    private authService: AuthService,
    private elem: ElementRef, private renderer: Renderer2) {
    }

    private checkRoles() {
        this.checkRoleAccess();
    }

  private checkRoleAccess() {

    const user: User = this.authService.getUser();
    const hasRoleAccess = user.hasAnyRoleOf(this.appRoles);

    if (!hasRoleAccess) {
        this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
    } else {
      if (this.existingDisplayPropertyValue) {
        this.renderer.setStyle(this.elem.nativeElement, 'display', this.existingDisplayPropertyValue);
      } else {
        this.renderer.removeStyle(this.elem.nativeElement, 'display');
      }
    }
  }

    /**
     * Initializes the state element and calls checkRoles().
     */
    ngAfterViewInit() {
    this.existingDisplayPropertyValue = this.elem.nativeElement.style.display;
    this.authService.user$.forEach(event => {
        this.checkRoles();
    });
    this.checkRoles();
    }
}
