'use strict';

module.exports = function(ngModule) {

/**
 * @ngdoc function
 * @name botanicApp.controller:PlantController
 * @description
 * # PlantController
 * Controller of the botanicApp
 */
ngModule.controller('PlantDetailsController', function ($scope, $state, $stateParams, $http, $log, appConfiguration, FileUploader, $rootScope) {
		var plantId = $stateParams.plantId;
		var plantPromise = $http.get(appConfiguration.botanicApiUrl + '/plants/' + plantId);
		var plantImagesPromise = $http.get(appConfiguration.botanicApiUrl + '/plants/' + plantId + '/images');

		$scope.plant = {
			species: '',
			genus: '',
			location: {
				latitude: 0,
				longitude: 0
			}
		};

		plantPromise.then(function(plants) {
			$log.info(plants);
			$scope.plant = plants.data;

			$scope.map = {
				center: {
						latitude: $scope.plant.location.latitude,
						longitude: $scope.plant.location.longitude
				},
				zoom: 12
			};
			$log.info('Map Data', $scope.Map);
		});

		plantImagesPromise.then(function(images) {
			$log.info(images);

			if (images.data._embedded) {
				$scope.images = images.data._embedded.images;
			}

		});

		$scope.goBack = function () {
			$state.go('plants.viewAll');
		};

		$scope.map = {
			center: {
				latitude: 45,
				longitude: -73
			},
			zoom: 12
		};

		var headers = {};

		console.log('appConfiguration',appConfiguration);

		if ($rootScope.user != null) {
			headers[appConfiguration.xAuthTokenHeaderName] = $rootScope.user.token;
		}

		var uploader = $scope.uploader = new FileUploader({
				url: 'api/plants/' + plantId + '/upload',
				headers: headers
		});

		uploader.filters.push({
			name: 'imageFilter',
			fn: function(item /*{File|FileLikeObject}*/, options) {
				console.log('options', options);
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		});

		// CALLBACKS

		uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
			console.info('onWhenAddingFileFailed', item, filter, options);
		};
		uploader.onAfterAddingFile = function(fileItem) {
			console.info('onAfterAddingFile', fileItem);
		};
		uploader.onAfterAddingAll = function(addedFileItems) {
			console.info('onAfterAddingAll', addedFileItems);
		};
		uploader.onBeforeUploadItem = function(item) {
			console.info('onBeforeUploadItem', item);
		};
		uploader.onProgressItem = function(fileItem, progress) {
			console.info('onProgressItem', fileItem, progress);
		};
		uploader.onProgressAll = function(progress) {
			console.info('onProgressAll', progress);
		};
		uploader.onSuccessItem = function(fileItem, response, status, headers) {
			console.info('onSuccessItem', fileItem, response, status, headers);
			if (typeof $scope.images === 'undefined') {
				$scope.images = [];
			}
			$scope.images.push(response);
		};
		uploader.onErrorItem = function(fileItem, response, status, headers) {
			console.info('onErrorItem', fileItem, response, status, headers);
		};
		uploader.onCancelItem = function(fileItem, response, status, headers) {
			console.info('onCancelItem', fileItem, response, status, headers);
		};
		uploader.onCompleteItem = function(fileItem, response, status, headers) {
			console.info('onCompleteItem', fileItem, response, status, headers);
		};
		uploader.onCompleteAll = function() {
			console.info('onCompleteAll');
		};
		console.info('uploader', uploader);
	});
};
