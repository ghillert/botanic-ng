/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="../app/components/navbar/navbar.directive.ts" />
/// <reference path="../app/components/malarkey/malarkey.directive.ts" />
/// <reference path="../app/components/webDevTec/webDevTec.service.ts" />
/// <reference path="../app/components/githubContributor/githubContributor.service.ts" />

declare var malarkey: any;
declare var toastr: Toastr;
declare var moment: moment.MomentStatic;

module botanicApp {
  'use strict';

  angular.module('botanicApp',
      ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize',
       'ngResource', 'ui.router', 'angularFileUpload', 'wu.masonry'])
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('appConfiguration', {
      //e.g. http://myserver:9000/rest
      botanicApiUrl: window.location.protocol + '//' + window.location.host + '/api',
      xAuthTokenHeaderName: 'x-auth-token'
    })
    .config(Config)

    .config(RouterConfig)

    .run(RunBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .controller('MainController', MainController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey)
    .config(function ($httpProvider) {
      /* Intercept http errors */
      var interceptor = function ($rootScope, $q, $location) {

        function success(response) {
          return response;
        }

        function error(response) {

          var status = response.status;
          var config = response.config;
          var method = config.method;
          var url = config.url;

          if (status === 401) {
            $location.path('/login');
          } else {
            $rootScope.error = method + ' on ' + url + ' failed with status ' + status;
          }

          return $q.reject(response);
        }

        return function (promise) {
          return promise.then(success, error);
        };
      };
      // $httpProvider.responseInterceptors.push(interceptor);
    })
    .run(function($rootScope, $http, $state, $cookieStore, appConfiguration, $log) {
      /* Reset error when a new view is loaded */
      $rootScope.$on('$viewContentLoaded', function() {
        delete $rootScope.error;
      });
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.data !== undefined && toState.data.authenticate !== undefined) {
          $log.info('Need to authenticate', toState);
          $log.info('User authenticated?', $rootScope.isAuthenticated());
          //appConfiguration.authenticationEnabled &&
          if (toState.data.authenticate && !$rootScope.isAuthenticated()){
            // User is not authenticated
            $log.info('Setting desired state to ' + toState.name);
            $rootScope.desiredToState = toState.name;
            $state.transitionTo('login');
            event.preventDefault();
          }
        }
      });
      $rootScope.isAuthenticated = function() {

        if ($rootScope.user === undefined) {
          return false;
        }
        if ($rootScope.user.isAuthenticated === undefined) {
          return false;
        }
        if (!$rootScope.user.isAuthenticated) {
          return false;
        }
        return true;
      };
      $rootScope.hasRole = function(role) {

        if (!$rootScope.isAuthenticated()) {
          return false;
        }
        if ($rootScope.user.roles[role] === undefined) {
          return false;
        }
        return $rootScope.user.roles[role];
      };

        // For a 'remember me' experience

//		var user = $cookieStore.get('user');
//		if (user !== undefined) {
//			$rootScope.user = user;
//			$http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName] = user.token;
//			$state.go('plants.viewAll'); //go to requested path?
//			//$location.path(originalPath);
//		}

    });

}
