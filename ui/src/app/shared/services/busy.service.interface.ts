import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface BusyServiceInterface {
  addObservable(observableToAdd: Observable<any>);
  addSubscription(subscriptionToAdd: Subscription);
}
