module botanicApp {
  'use strict';

  export class RunBlock {
    /** @ngInject */
    constructor($log: ng.ILogService, $rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $log.debug('runBlock end');
    }

  }
}
