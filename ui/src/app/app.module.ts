import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastContainerModule } from 'ngx-toastr';

import { AboutModule } from './about/about.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GardenModule } from './garden/garden.module';
import { PlantModule } from './plant/plant.module';
import { SharedModule } from './shared/shared.module';

/* Feature Modules */
/**
 * Executed when the app starts up. Will restore security
 * information if available.
 *
 * @param authService
 */
export function init(authService: AuthService) {
  return () => {
    console.log(`>>>INIT`);
    return authService.restoreSecurity().map(user => {
      if (user.isAuthenticated) {
        console.log(`User ${user.username} restored.`);
      } else {
        console.log(`User not restored.`);
      }
      return user;
    }).toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    AboutModule,
    BrowserModule,
    GardenModule,
    PlantModule,
    SharedModule,
    AppRoutingModule,
    ToastContainerModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      'provide': APP_INITIALIZER,
      'useFactory': init,
      'deps': [ AuthService ],
      'multi': true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

