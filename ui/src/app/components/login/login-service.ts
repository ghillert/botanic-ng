'use strict';

/**
 * @ngdoc function
 * @name botanicApp.controller:AboutController
 * @description
 * # AboutController
 * Controller of the botanicApp
 */
angular.module('botanicApp')
	.factory('LoginService', function($resource) {
		return $resource(':action', {},
			{
				authenticate: {
					method: 'POST',
					url : '/api/authenticate',
					params: {'action' : 'authenticate'}
				}
			}
		);
});
