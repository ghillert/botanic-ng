angular.module('myModule', []).
  config(function(injectables) { // provider-injector
    // This is an example of config block.
  }).
  run(function(injectables) { // instance-injector
    // Like a Main method
  });