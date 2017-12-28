import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { BUSY_CONFIG_DEFAULTS, BusyConfig, NgBusyModule } from 'ng-busy';
import { NgxMasonryModule } from 'ng5-masonry';
import { ToastrModule } from 'ngx-toastr';
import * as SockJS from 'sockjs-client';

import { ErrorHandler } from './model/error-handler';
import { BusyService } from './services/busy.service';

export function socketProvider() {
  return new SockJS('/websocket');
}

const busyConfig: BusyConfig = {
  message: 'Processing..',
  delay: 0,
  template: BUSY_CONFIG_DEFAULTS.template,
  minDuration: 1000,
  backdrop: true,
  wrapperClass: BUSY_CONFIG_DEFAULTS.wrapperClass
};

const stompConfig: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: false
};

/**
 * This module contains/declares all application-wide shared functionality.
 *
 * @author Gunnar Hillert
 * @author Ilayaperumal Gopinathan
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgBusyModule.forRoot(busyConfig),
    ToastrModule.forRoot({ timeOut: 5000 }),
    NgxMasonryModule
  ],
  declarations: [
  ],
  providers: [
    BusyService,
    ErrorHandler,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  exports: [
    NgBusyModule,
    NgxMasonryModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class SharedModule { }
