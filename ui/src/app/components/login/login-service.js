'use strict';

module.exports = function(ngModule) {

/**
 * @ngdoc function
 * @name botanicApp.controller:AboutController
 * @description
 * # AboutController
 * Controller of the botanicApp
 */
ngModule.factory('LoginService', function($resource) {
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
};
