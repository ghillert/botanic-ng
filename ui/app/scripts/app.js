'use strict';

/**
 * @ngdoc overview
 * @name botanicApp
 * @description
 * # botanicApp
 *
 * Main module of the application.
 */
angular
	.module('botanicApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ui.router',
		'ngSanitize',
		'ngTouch',
		'google-maps',
		'angularFileUpload',
		'wu.masonry'
	])
	.constant('appConfiguration', {
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
		$httpProvider.responseInterceptors.push(interceptor);
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

