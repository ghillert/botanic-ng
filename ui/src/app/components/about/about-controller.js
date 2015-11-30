'use strict';

module.exports = function(ngModule) {
  /**
   * @ngdoc function
   * @name botanicApp.controller:AboutController
   * @description
   * # AboutController
   * Controller of the botanicApp
   */
  ngModule.controller('AboutController', function ($scope) {
    $scope.message = 'Spring Rocks';
  });

};
