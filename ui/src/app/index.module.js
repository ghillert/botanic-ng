'use strict';

require('jquery');
require('../styles/main.less');
var angular = require('angular');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-ui-router');
require('angular-sanitize');
require('angular-touch');
require('angular-file-upload');
require('angular-simple-logger');
require('angular-google-maps');

require('angular-masonry/node_modules/jquery-bridget');
require('angular-masonry/node_modules/imagesloaded/node_modules/eventie');
require('angular-masonry/node_modules/imagesloaded/node_modules/wolfy87-eventemitter');
require('angular-masonry/node_modules/imagesloaded');

require('angular-masonry/node_modules/masonry-layout/node_modules/fizzy-ui-utils/node_modules/desandro-matches-selector');
require('angular-masonry/node_modules/masonry-layout/node_modules/fizzy-ui-utils/node_modules/doc-ready');
require('angular-masonry/node_modules/masonry-layout/node_modules/fizzy-ui-utils');
require('angular-masonry/node_modules/masonry-layout/node_modules/get-size/node_modules/desandro-get-style-property');
require('angular-masonry/node_modules/masonry-layout/node_modules/get-size');
require('angular-masonry/node_modules/masonry-layout/node_modules/outlayer');
require('angular-masonry/node_modules/masonry-layout');
require('angular-masonry');
require('bootstrap');

require('file?name=[name].[ext]!../index.html');
require('file?name=[name].[ext]!../favicon.ico');
require('file?name=[name].[ext]!../apple-touch-icon.png');

var ngModule = module.exports = angular
    .module('botanicApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ui.router',
      'ngSanitize',
      'ngTouch',
      'uiGmapgoogle-maps',
      'angularFileUpload',
      'wu.masonry'
    ]);

require('./components/about')(ngModule);
require('./components/garden')(ngModule);
require('./components/login')(ngModule);
require('./components/plants')(ngModule);

require('./index.route')(ngModule);

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

    ngModule.constant('appConfiguration', {
      //e.g. http://myserver:9000/rest
      botanicApiUrl: window.location.protocol + '//' + window.location.host + '/api',
      xAuthTokenHeaderName: 'x-auth-token'
    })
    .run(function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    })
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
