'use strict';

/**
 * @ngdoc function
 * @name botanicApp.controller:GardenController
 * @description
 * # GardenController
 * Controller of the botanicApp
 */
angular.module('botanicApp')
	.controller('GardenController', function ($scope, $log, $http, $state, appConfiguration) {

		$scope.loadStores = function () {
			var storePromise = $http.get(appConfiguration.botanicApiUrl + '/gardens');
			storePromise.then(function(gardens) {
				$log.info('Retrieved gardens', gardens);
				if (stores.data._embedded) {
					$scope.garden = stores.data._embedded.gardens[0];
				}
			});
		};

		$scope.loadStores();
	});
