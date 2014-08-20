'use strict';

/**
 * @ngdoc overview
 * @name botanicApp
 * @description
 * # botanicApp
 *
 * Main module of the application.
 */
angular
  .module('botanicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'google-maps',
    'angularFileUpload',
    'wu.masonry'
  ])
  .constant('appConfiguration', {
    //e.g. http://myserver:9000/rest
    botanicApiUrl: window.location.protocol + '//' + window.location.host + '/api',
  })
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config(function () {

  });
