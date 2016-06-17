'use strict';

angular.module('BeMEAN', [
  'ngRoute'
, 'User'
, 'Curso'
])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html'
      })
      .otherwise({redirectTo: '/'});
  }])