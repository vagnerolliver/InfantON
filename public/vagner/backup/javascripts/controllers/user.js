let a = "";
angular.module('User', [])
 
  .controller('UserController', UserController)
  // .controller('UserDetailsController', UserDetailsController)

  .factory('myService', function($http) {
      var promise;
      var myService = {
        async: function() {
          if ( !promise ) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.get('/api/users').then(function (response) {
              // The then function here is an opportunity to modify the response
              // console.log(response);
           
              // The return value gets picked up by the then in the controller.
              return response.data;

            });
          }
          // Return the promise to the controller
          return promise;
          // console.log(promise)
        }
      };
      // console.log(myService)
      return myService;
    })

 
function UserController(myService,  $http) {

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

  myService.async().then(function(d) {
    // $scope.data = d;
     vm.users = d;
  });

  // function getKeyLength() {
  //   return Object.keys(angular.copy(vm.users[0])).length;
  // }

  // vm.keysLength = getKeyLength();

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

  vm.add = add;
  function add(user) {
 
    $http({
      method: 'POST'
    ,  responseType:'json'  
    ,  url: '/api/users/'
    , data: { email:user.email, password:user.password }
    })
    .then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
    });

    vm.users.push(angular.copy(user));
    vm.form = {};
  }
  vm.remove = remove;
  function remove(users) {
    vm.users = users.filter(function(el){ 
    
    console.log(el)

    if( el.selecionado ){
      
      $http({
        method: 'DELETE',
        url: '/api/users/'+el._id
      })
      .then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
      }); 
    
    }
    
    return !el.selecionado 
   
    });
  
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

      console.log(user)

      if(i === user.index) {

        $http({
          method: 'PUT',
          url: '/api/users/'+user._id,
          data: { email:user.email, password:user.password }
        })
        .then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
        }); 


        delete user.index;

        return user;

        console.log(user)
      }
      return el;
    });
    vm.users = users;
    vm.editing = false;

    console.log(users)
  }
}


// function UserDetailsController($routeParams) {
//   var vm = this;
//   vm.routeParams = $routeParams;
//   vm.editing = false;
//   vm.reverse = false;
//   vm.modelOptions = {
//     updateOn: 'blur default'
//   , debounce: {
//       default: 1000
//     , blur: 0
//     }
//   }
//   vm.users = [
//     {name: 'Suissa', email: 'suissera@manoveio.com', type: 'teacher', active: true}
//   , {name: 'João', email: 'joao@macioesedoso.com', type: 'student', active: false}
//   , {name: 'Franciele', email: 'fran@quimica.com', type: 'teacher', active: false}
//   , {name: 'Maria', email: 'm@gmail.com', type: 'student', active: true}
//   , {name: 'José', email: 'js@gmail.com', type: 'student', active: true}
//   ];

//   function getKeyLength() {
//     return Object.keys(angular.copy(vm.users[0])).length;
//   }
//   vm.keysLength = getKeyLength();

//   vm.orderByName = orderByName;
//   function orderByName() {
//     vm.predicate = 'name';
//     vm.reverse = !vm.reverse;
//   }
//   vm.orderByEmail = orderByEmail;
//   function orderByEmail() {
//     vm.predicate = 'email';
//     vm.reverse = !vm.reverse;
//   }

//   vm.add = add;
//   function add(user) {
//     vm.users.push(angular.copy(user));
//     vm.form = {};
//   }
//   vm.remove = remove;
//   function remove(users) {
//     vm.users = users.filter(function(el){ return !el.selecionado });
//   }

//   vm.edit = edit;
//   function edit(user, index) {
//     vm.form = angular.copy(user);
//     vm.form.index = index;
//     vm.editing = true;
//   }

//   vm.save = save;
//   function save(user) {
//     var users = vm.users.map(function(el, i) {
//       if(i === user.index) {
//         delete user.index;
//         return user;
//       }
//       return el;
//     });
//     vm.users = users;
//     vm.editing = false;
//   }
// }