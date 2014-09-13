'use strict';

angular.module('botanicApp')
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/plants');

		$stateProvider.state('plants', {
			abstract: 'true',
			template: '<ui-view/>'
		})
		.state('plants.viewAll', {
			url: '/plants',
			controller: 'PlantController',
			templateUrl: 'views/plants.html'
		})
		.state('plants.addPlant', {
			url: '/plants/add',
			controller: 'AddPlantController',
			templateUrl: 'views/add-plant.html',
			data: {
				authenticate: true
			}
		})
		.state('plants.plantDetails', {
			url: '/plants/{plantId}',
			controller: 'PlantDetailsController',
			templateUrl: 'views/plant-details.html'
		})
		.state('garden', {
			url: '/garden',
			controller: 'GardenController',
			templateUrl: 'views/garden.html'
		})
		.state('login', {
			url: '/login',
			controller: 'LoginController',
			templateUrl: 'views/login.html'
		})
		.state('logout', {
			url: '/logout',
			controller: 'LogoutController',
		})
		.state('about', {
			url: '/about',
			templateUrl: 'views/about.html'
		});
	});
