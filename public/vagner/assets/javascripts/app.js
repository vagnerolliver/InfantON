'use strict';

angular.module('BeMEAN', [
  'ngRoute'
, 'User'
, 'Aluno'
, 'Curso'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: '/views/users-list.html',
      controller: 'UserController',
      controllerAs: 'User'
    })
    .when('/users', {
      templateUrl: '/views/users-list.html',
      controller: 'UserController',
      controllerAs: 'User'
    })
    .when('/alunos', {
      templateUrl: '/views/alunos-list.html',
      controller: 'AlunoController',
      controllerAs: 'Aluno'
    })
    .when('/alunos/:id/id/:keyId', {
        templateUrl: '/views/alunos-details.html',
        controller: 'AlunoDetailsController',
        controllerAs: 'AlunoDetails'
    })
    .when('/cursos', {
        templateUrl: '/views/cursos-list.html',
        controller: 'CursoController',
        controllerAs: 'Curso'
    })
	 .otherwise({redirectTo: '/users'});

}])

 