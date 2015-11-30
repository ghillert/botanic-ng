'use strict';

module.exports = function(ngModule) {

	require('./login-service')(ngModule);
/**
 * @ngdoc function
 * @name botanicApp.controller: LoginController
 * @description
 * Responsible for authenticating users. Also provides logout functionality.
 */
	ngModule.controller('LoginController', function ($log, $scope, $rootScope, $state, $http, $cookieStore, LoginService, appConfiguration) {
		$scope.login = function() {
			$log.info('Logging in...', $scope.user);
			LoginService.authenticate($scope.user, function(user) {
				$log.info('got user:', user);
				$rootScope.user = user;
				$rootScope.user.isAuthenticated = true;
				$http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName] = user.token;
				console.log('$http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName]', $http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName]);
				//For a 'remember me' experience
				//$cookieStore.put('user', user);
				if ($rootScope.desiredToState !== undefined) {
					$state.go($rootScope.desiredToState);
					$rootScope.desiredToState = undefined;
				}
				else {
					$state.go('plants.viewAll');
				}
			});
		};
	})
	.controller('LogoutController', function ($log, $rootScope, $http, $cookieStore, appConfiguration, $state) {
		$log.info('Logging out...');
		delete $rootScope.user;
		delete $http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName];
		$cookieStore.remove('user');
		$state.go('plants.viewAll');
	});
};

