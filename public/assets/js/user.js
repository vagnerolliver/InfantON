// db.dropDatabase()
// db.collection.remove()
angular.module('User', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'views/users-list.html',
        controller: 'UserController',
        controllerAs: 'User'
      })
      .when('/users/create', {
        templateUrl: 'views/users-create.html',
        controller: 'UserController',
        controllerAs: 'User'
      })
      .when('/users/:id', {
        templateUrl: 'views/users-details.html',
        controller: 'UserDetailsController',
        controllerAs: 'UserDetails'
      });
  }])
  .controller('UserController', UserController)
  .controller('UserDetailsController', UserDetailsController)
  .service('myServiceUser', myServiceUser)

function myServiceUser($http) {
  const URL_USER = "/api/users/";
  const URL_ALUNO = "/api/alunos/";
  this.list = function() {
    const method = "GET"; 
    const request = {
      url:URL_ALUNO
    , method:method 
    }
    return $http(request);
  }
  this.findOne = function(id){
    const  promisse = {
      method: 'GET',
      url: URL_ALUNO+id         
    }
    return $http(promisse);
  }
  this.addUser = function(user){
    const method = "POST"; 
    const request = {
      url:URL_USER
    , method:method 
    , data: user
    } 
    return $http(request);
  }
  this.addAluno = function(user){
    const method = "POST"; 
    const request = {
      url:URL_ALUNO
    , method:method 
    , data: user
    } 
    return $http(request);
  }
  this.removeUser = function(user){
    const  promisse = {
      method: 'DELETE',
      url: URL_USER+user._id         
    }
    return $http(promisse);
  }
  this.removeAluno = function(user){
    const  promisse = {
      method: 'DELETE',
      url: URL_ALUNO+user._id         
    }
    return $http(promisse);
  }
}  

function UserController(myServiceUser, myServiceCurso) {
  var vm = this;
  vm.editing = false;
  vm.reverse = false;
  vm.users = [];
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
      console.log("vm.cursos",response.data)
    }, function errorCallback(response) {
      console.log("Error: ", response.data);
  });
 
  myServiceUser
  .list() 
    .then(function successCallback(response) {
      var listAlunos = response.data;
      for (i = 0; i < listAlunos.length; i++) { 
        myServiceUser
          .findOne(listAlunos[i]._id) // retorna com populate 
          .then(function successCallback(response) {
            vm.users.push(response.data);
           }, function errorCallback(response) {
            console.log("Error: ", response.data);
        });
      }
    }, function errorCallback(response) {
      console.log("Error: ", response.data);
  });
 
  vm.remove = remove;
  function remove(user) {
    const filtrarUsuarioRemovido = function(el){
      return user._id != el._id;
    }
    if(confirm('Deseja excluir este usário?')){
      myServiceUser
      .removeAluno(user)
      .then(function successCallback(response) {     
          console.log("Data: ", response.data);
          vm.users = vm.users.filter(filtrarUsuarioRemovido);
          myServiceUser
          .removeUser(user.user)
          .then(function successCallback(response) {     
               console.log("Data: ", response.data);
            }, function errorCallback(response) {
              console.log("Erro: ",response.data);
          }); 
        }, function errorCallback(response) {
          console.log("Erro: ",response.data);
      });
    }
    else alert("Ok, não será removido"); 
  }

  vm.edit = edit;
  function edit(user, index) {
    vm.form = angular.copy(user);
    vm.form.index = index;
    vm.editing = true;
  }

  vm.save = save;
  function save(user) {
    var users = vm.users.map(function(el, i) {
      if(i === user.index) {
        delete user.index;
        return user;
      }
      return el;
    });
    vm.users = users;
    vm.editing = false;
  }

  vm.submitForm = submitForm;
  function submitForm(user) {
 
  console.log('submitForm', user);
  console.log('submitForm Cursos', user.cursos);
  var isArrayCurso = [];
  console.log(user.cursos)
  var cont = 0;
  if( user.cursos != undefined ){  
    angular.forEach(user.cursos, function(el, i){
      if( el == true ){ 
          isArrayCurso.push(i); 
          cont++;
      }

    });
  } else {  
    isArrayCurso = null;
  }

  if(cont == 1 ){
    isArrayCurso.push(undefined);
  }

  myServiceUser
    .addUser(user)
    .then(function successCallback(response) {     
         console.log("Data: ", response.data);
         console.log("Data: ", response.data);
         var new_user = [
            { 
                name:user.name
              , email:user.email  
              , dateBirth:user.dateBirth
              , user_id:response.data._id
              , cursos:isArrayCurso
            }
          ]
         
          console.log("New User",new_user);
          myServiceUser
          .addAluno(new_user)
          .then(function successCallback(response) {     
               vm.users.push(angular.copy(response.data));
               console.log("Data: ",response.data)
               vm.form = {};
            }, function errorCallback(response) {
              console.log("Error: ",response.data);
          });
      }, function errorCallback(response) {
        console.log("Error: ",response.data);
    });

  }
  
  vm.orderByName = orderByName;
  function orderByName() {
    vm.predicate = 'name';
    vm.reverse = !vm.reverse;
  }
  vm.orderByEmail = orderByEmail;
  function orderByEmail() {
    vm.predicate = 'email';
    vm.reverse = !vm.reverse;
  }
}
// UserController.$inject = ['myServiceUser'];


function UserDetailsController($routeParams, myServiceUser) {
  var vm = this;
  vm.routeParams = $routeParams;
  vm.editing = false;
  vm.reverse = false;
  vm.modelOptions = {
    updateOn: 'blur default'
  , debounce: {
      default: 1000
    , blur: 0
    }
  }

  myServiceUser
    .findOne(vm.routeParams.id) // retorna com populate 
    .then(function successCallback(response) {
      vm.routeParams = response.data;
      console.log("Data: ", vm.routeParams);
     }, function errorCallback(response) {
      console.log("Error: ", response.data);
  });

  vm.save = save;
  function save(user) {
    var users = vm.users.map(function(el, i) {
      if(i === user.index) {
        delete user.index;
        return user;
      }
      return el;
    });
    vm.users = users;
    vm.editing = false;
  }

  vm.orderByName = orderByName;
  function orderByName() {
    vm.predicate = 'name';
    vm.reverse = !vm.reverse;
  }
  vm.orderByEmail = orderByEmail;
  function orderByEmail() {
    vm.predicate = 'email';
    vm.reverse = !vm.reverse;
  }

}
// UserDetailsController.$inject = ['$routeParams', '$http'];