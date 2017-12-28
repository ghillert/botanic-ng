import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

export class ErrorHandler {

    /**
     * Generate the error message that will be used and throw the appropriate exception.
     * @param error the exception that was thrown by the http post.
     * @returns {any} Exception to be thrown by the Observable
     */
    public handleError(error: Response | any) {
        let errMsg = '';
        errMsg = `${error.message} (Status code: ${error.status})`;
        return Observable.throw(errMsg);
    }
}
