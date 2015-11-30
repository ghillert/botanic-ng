'use strict';

module.exports = function(ngModule) {

  ngModule.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/plants');

    $stateProvider.state('plants', {
      abstract: 'true',
      template: '<ui-view/>'
    })
        .state('plants.viewAll', {
          url: '/plants',
          controller: 'PlantController',
          template: require('./components/plants/plants.html')
        })
        .state('plants.addPlant', {
          url: '/plants/add',
          controller: 'AddPlantController',
          template: require('./components/plants/add-plant.html'),
          data: {
            authenticate: true
          }
        })
        .state('plants.plantDetails', {
          url: '/plants/{plantId}',
          controller: 'PlantDetailsController',
          template: require('./components/plants/plant-details.html')
        })
        .state('garden', {
          url: '/garden',
          controller: 'GardenController',
          template: require('./components/garden/garden.html')
        })
        .state('login', {
          url: '/login',
          controller: 'LoginController',
          template: require('./components/login/login.html')
        })
        .state('logout', {
          url: '/logout',
          controller: 'LogoutController',
        })
        .state('about', {
          url: '/about',
          template: require('./components/about/about.html')
        });
  });
};
