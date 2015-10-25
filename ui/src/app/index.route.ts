module botanicApp {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('plants', {
            abstract: true,
            template: '<ui-view/>'
          })
        .state('plants.viewAll', {
          url: '/plants',
          controller: 'PlantController',
          templateUrl: 'app/components/plants/plants.html'
        })
        .state('plants.addPlant', {
          url: '/plants/add',
          controller: 'AddPlantController',
          templateUrl: 'app/components/plants/add-plant.html',
          data: {
            authenticate: true
          }
        })
        .state('plants.plantDetails', {
          url: '/plants/{plantId}',
          controller: 'PlantDetailsController',
          templateUrl: 'app/components/plants/plant-details.html'
        })
        .state('garden', {
          url: '/garden',
          controller: 'GardenController',
          templateUrl: 'app/components/garden/garden.html'
        })
        .state('login', {
          url: '/login',
          controller: 'LoginController',
          templateUrl: 'app/components/login/login.html'
        })
        .state('logout', {
          url: '/logout',
          controller: 'LogoutController'
        })
        .state('about', {
          url: '/about',
          controller: 'AboutController',
          templateUrl: 'app/components/about/about.html'
        });

      $urlRouterProvider.otherwise('/plants');
    }

  }
}
