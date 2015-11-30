'use strict';

module.exports = function(ngModule) {

	/**
	 * @ngdoc function
	 * @name botanicApp.controller:PlantController
	 * @description
	 * # PlantController
	 * Controller of the botanicApp
	 */
	ngModule.controller('PlantController', function ($scope, $log, $http, $state, appConfiguration) {
		$scope.addPlant = function () {
			$log.info($state);
			$log.info($state.includes('plants'));
			$state.go('plants.addPlant');
		};
		$scope.viewPlantDetails = function (plant) {
			$log.info('Show details for plant with Id: ' + plant.id);
			$state.go('plants.plantDetails', {plantId: plant.id});
		};
		$scope.deletePlant = function (plant) {
			$log.info('Deleting plant with Id: ' + plant.id);
			console.log('$http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName]', $http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName]);

			$http.delete(appConfiguration.botanicApiUrl + '/plants/' + plant.id).then(function () {
				$scope.loadPlants();
			});
		};
		$scope.loadPlants = function () {
			var plantPromise = $http.get(appConfiguration.botanicApiUrl + '/plants');
			plantPromise.then(function (plants) {
				$log.info('Retrieved plants', plants);
				console.log(plants);
				if (plants.data._embedded) {
					$scope.plants = plants.data._embedded.plants;
				}
			});
		};

		$scope.loadPlants();
	})

		.controller('AddPlantController', function ($scope, $state, $log, $http, appConfiguration) {
			$scope.map = {
				center: {
					latitude: 33.7489954,
					longitude: -84.3879824
				},
				zoom: 12,
				events: {
					tilesloaded: function (map, eventName, originalEventArgs) {
						$log.log('Map has loaded: ' + eventName, map, originalEventArgs);
					},
					click: function (mapModel, eventName, originalEventArgs) {
						// 'this' is the directive's scope
						$log.log('user defined event: ' + eventName, mapModel, originalEventArgs);

						var e = originalEventArgs[0];
						var lat = e.latLng.lat(),
							lon = e.latLng.lng();
						$scope.map.clickedMarker = {
							id: 0,
							title: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
							latitude: lat,
							longitude: lon
						};
						$scope.plant.location.latitude = lat;
						$scope.plant.location.longitude = lon;
						//scope apply required because this event handler is outside of the angular domain
						$scope.$apply();
					}
				}
			};
			$scope.plant = {
				genus: '',
				species: '',
				commonName: '',
				location: {
					latitude: 0,
					longitude: 0
				}
			};
			$scope.goBack = function () {
				$state.go('plants.viewAll');
			};

			$scope.getMyLocation = function () {
				$log.info('Retrieving Location Information');
				navigator.geolocation.getCurrentPosition(function success(data) {
					$log.info('Location data retrieved', data);
					var coordinates = data.coords;
					$scope.$apply(function () {
						$scope.plant.location.latitude = coordinates.latitude;
						$scope.plant.location.longitude = coordinates.longitude;
					});
				});
			};
			$scope.submitPlant = function () {
				$log.info('Adding New Plant', $scope.plant);
				var addPlantPromise = $http.post(appConfiguration.botanicApiUrl + '/plants', $scope.plant);

				addPlantPromise.then(function (response) {
					$log.info(response);
					$state.go('plants.viewAll');
				});
			};
			$scope.$watch('plant.location', function () {
				if ($scope.plant.location.latitude && $scope.plant.location.longitude) {
					$scope.map.center.latitude = $scope.plant.location.latitude;
					$scope.map.center.longitude = $scope.plant.location.longitude;
				}
			}, true);
		});
};
