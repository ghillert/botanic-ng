import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusyServiceInterface } from './busy.service.interface';

/**
 * A service for global spinners. Allows for services and
 * components to invoke the global spinner, without being aware
 * of how it is being rendered.
 *
 * @author Gunnar Hillert
 */
@Injectable()
export class BusyService implements BusyServiceInterface {

  public busyObjects$ = new BehaviorSubject<any[]>([]);

  addObservable(observableToAdd: Observable<any>) {
    this.busyObjects$.next(this.busyObjects$.getValue().concat(observableToAdd));
  }
  addSubscription(subscriptionToAdd: Subscription) {
    this.busyObjects$.next(this.busyObjects$.getValue().concat(subscriptionToAdd));
  }
}
