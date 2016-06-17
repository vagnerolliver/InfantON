angular.module('Curso', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/cursos/create', {
        templateUrl: 'views/cursos-create.html',
        controller: 'CursoController',
        controllerAs: 'Curso'
      })
  }]) 
  .controller('CursoController', CursoController)
  .service('myServiceCurso', myServiceCurso)

function myServiceCurso($http) {
    const url = "/api/cursos/";
    this.list = function() {
      const method = "GET"; 
      const request = {
        url:url
      , method:method 
      }
      return $http(request);
    }
    this.remove = function(curso){
      const  promisse = {
        method: 'DELETE',
        url: url+curso._id         
      }
      return $http(promisse);
    }
    this.add = function(curso){
      const method = "POST"; 
      const request = {
        url:url
      , method:method 
      , data: curso
      } 
      return $http(request);
    }
}

function CursoController(myServiceCurso) {

 var vm = this;
  vm.editing = false;
  vm.reverse = false;
  vm.modelOptions = {
    updateOn: 'blur default'
  , debounce: {
      default: 1000
    , blur: 0
    }
  }
  
  myServiceCurso
  .list() 
    .then(function successCallback(response) {
      vm.cursos = response.data;
      console.log("init vm.cursos: ", vm.cursos);
    }, function errorCallback(response) {
      console.log("Error: ", response.data);
  });
 
  vm.add = add;
  function add(curso) {
    console.log(curso);
    myServiceCurso
    .add(curso)
    .then(function successCallback(response) {     
         console.log("Data: ", response.data);
         vm.cursos.push(angular.copy(response.data));
         vm.form = {};
      }, function errorCallback(response) {
        console.log("Error: ",response.data);
    });
  }

  vm.remove = remove;
  function remove(curso) {
    const filtrarCursoRemovido = function(el){
      return curso._id != el._id;
    }
    if(confirm('Deseja excluir este curso?')){
      myServiceCurso
      .remove(curso)
      .then(function successCallback(response) {     
           console.log("Data: ", response.data);
           vm.cursos = vm.cursos.filter(filtrarCursoRemovido);
        }, function errorCallback(response) {
          console.log("Erro: ",response.data);
      });
    }
    else alert("Ok, não será removido"); 
  }

  vm.edit = edit;
  function edit(curso, index) {
    alert("Não é possivel editar, exclua e faça um novo cadastro.")
  }
  vm.orderByName = orderByName;
  function orderByName() {
    vm.predicate = 'name';
    vm.reverse = !vm.reverse;
  }

  vm.orderByData = orderByData;
  function orderByData() {
    vm.predicate = 'dateBegin';
    vm.reverse = !vm.reverse;
  }
}
