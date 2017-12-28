import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { CapsLockDirective } from './directives/caps-lock.directive';
import { RolesDirective } from './directives/roles.directive';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RolesMissingComponent } from './roles-missing.component';
import { AuthGuard } from './support/auth.guard';
import { TokenInterceptor } from './support/token.interceptor';

@NgModule({
  imports: [
    SharedModule, AuthRoutingModule
  ],
  declarations: [
    LoginComponent, LogoutComponent, CapsLockDirective, RolesDirective, RolesMissingComponent
  ],
  providers: [
    AuthGuard, AuthService, TokenInterceptor
  ],
  exports: [
    CapsLockDirective, RolesDirective
  ]
})

export class AuthModule { }
