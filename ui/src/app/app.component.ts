import { Component, Renderer2, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import { AuthService } from './auth/auth.service';
import { User } from './auth/model/user.model';
import { BusyService } from './shared/services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  user: User;
  public busy: any = [];

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private toastrService: ToastrService,
    private busyService: BusyService) {
  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.updateToasty();
    this.renderer.listen('document', 'scroll', (evt) => {
      this.updateToasty();
    });
    this.renderer.listen('document', 'resize', (evt) => {
      this.updateToasty();
    });

    this.authService.user$.forEach(user => {
      this.user = user;
    });
    this.busyService.busyObjects$.forEach(busyObject => {
      if (busyObject) {
        // while (busyObject.length > 0) {
        //   /*
        //    * Unfortunately, Angular2 Busy does not support
        //    * "Overlapping Subscriptions" and does not work
        //    * with mutable arrays. Ideally, good Spinner solution
        //    * would be able to accept a BehaviorSubject<boolean> as input,
        //    * so that we could manage the on/off state of the spinner on
        //    * our end.
        //    *
        //    * see: https://github.com/devyumao/angular2-busy/issues/77
        //    */
        //   //this.busy = [];
        //   //this.busy.push(busyObject.pop());
        // }
      }
    });
  }

  private updateToasty() {
    const bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navHeight = document.getElementsByTagName('nav')[0].offsetHeight;

    let marginToParent = 10;
    const toastyElement = this.toastContainer.getContainerElement();

    if (window.outerWidth <= 768) {
      marginToParent = 0;
    }

    if (bodyScrollTop < navHeight) {
      toastyElement.style.top = navHeight + marginToParent + 'px';
    } else {
      toastyElement.style.top = bodyScrollTop + marginToParent + 'px';
    }
  }
}
