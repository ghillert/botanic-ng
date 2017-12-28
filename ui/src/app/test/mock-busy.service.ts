import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusyServiceInterface } from '../shared/services/busy.service.interface';

/**
 * Mock for AuthService.
 *
 * @author Gunnar Hillert
 */
export class MockBusyService implements BusyServiceInterface {
  addObservable(observableToAdd: Observable<any>) {
    throw new Error('Method not implemented.');
  }
  addSubscription(subscriptionToAdd: Subscription) {
    throw new Error('Method not implemented.');
  }
}
