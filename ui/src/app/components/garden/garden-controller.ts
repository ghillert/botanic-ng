'use strict';

declare var Stomp;

/**
 * @ngdoc function
 * @name botanicApp.controller:GardenController
 * @description
 * # GardenController
 * Controller of the botanicApp
 */
angular.module('botanicApp')
	.controller('GardenController', function ($scope) {
		$scope.images = [];
		console.log('GardenController');

		var socket = new SockJS('http://localhost:9900/websocketbroker');
		var stompClient = Stomp.over(socket);

		stompClient.debug = function() { //disable debugging
		};

		stompClient.connect({}, function(frame) {
			console.log('Connected...', frame);
			stompClient.subscribe('/queue/pictures', function(message) {
				var pictureJson = JSON.parse(message.body);
				console.log('Receiving Garden Picture', pictureJson.name);

				console.log($scope.images.length);

				if ($scope.images.length === 0) {
					$scope.images = [];
				}

				if ($scope.images.length > 5) {
					$scope.images.shift();
				}

				$scope.images.push(pictureJson);
				$scope.$apply();
			});
		}, function(error) {
			console.log('STOMP protocol error', error);
		});
	});
