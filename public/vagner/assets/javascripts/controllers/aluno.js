 
angular.module('Aluno', [])
 
  .controller('AlunoController', AlunoController)
  .controller('AlunoDetailsController', AlunoDetailsController)

  .factory('myServiceAluno', function($http) {
    var promise;
    var myService = {
      async: function() {
        if ( !promise ) {
          promise = $http.get('/api/alunos').then(function (response) {           
            return response.data;

          });
        }
        return promise;
      }
    };
    return myService;
  })

 
function AlunoController(myServiceAluno,  myServiceCurso, $http) {

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

  myServiceAluno.async().then(function(d) {
     vm.alunos = d;
 
     console.log("aqui");
     
     var alunos = vm.alunos.map(function(el, i) {

        $http({
          method: 'GET'
        ,  responseType:'json'  
        ,  url: '/api/users/'+el.user_id
        })
        .then(function successCallback(response) {
       
            var user_aluno = response;

            console.log(user_aluno)

            // vm.alunos.map(function(el, i) {

            //   if(i ===  $routeParams.id) {
                
            //     delete el;
            //     return aluno;

            //   }
            //   return el;
            // });
            
            // vm.alunos = aluno;
            // vm.editing = false;


          }, function errorCallback(response) {
            console.log(response);
        });

      return el;
    });

     console.log(alunos)


  });

  myServiceCurso.async().then(function(d) {
     vm.cursos = d;
  });

  // function getKeyLength() {
  //   return Object.keys(angular.copy(vm.alunos[0])).length;
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

  function add(aluno) {
  
    var arrayCurso = [];

    vm.cursos.filter(function(el){ 
    
      if( el.selecionado ){    
        arrayCurso.push(el._id);
      }
      
    });

    $http({
      method: 'POST'
    ,  responseType:'json'  
    ,  url: '/api/users/'
    , data: { email:aluno.email, password:aluno.password }
    })
    .then(function successCallback(response) {

        console.log( response.data._id );

        $http({
           method: 'POST'
        ,  responseType:'json'  
        ,  url: '/api/alunos'
        , data: { user_id:response.data._id, name:aluno.name, dateBirth:aluno.dateBirth, cursos:arrayCurso }
        })
        .then(function successCallback(response) {
         
            console.log(response);
         
          }, function errorCallback(response) {
         
            console.log(response);
        
        });

      }, function errorCallback(response) {

        console.log(response);

    }); 
    
    console.log(aluno);
    
    vm.alunos.push(angular.copy(aluno));
    vm.form = {};
  }

  vm.remove = remove;

  function remove(alunos) {
    vm.alunos = alunos.filter(function(el){ 
    
    console.log(el)

    if( el.selecionado ){
      
      $http({
        method: 'DELETE',
        url: '/api/alunos/'+el._id
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
  function edit(aluno, index) {
    console.log(aluno);
    vm.form = angular.copy(aluno);
    vm.form.index = index;
    vm.editing = true;
  }

  vm.save = save;
  function save(aluno) {
    var alunos = vm.alunos.map(function(el, i) {

      console.log(aluno)

      if(i === aluno.index) {

        $http({
          method: 'PUT',
          url: '/api/alunos/'+aluno._id,
          data: { email:aluno.email, password:aluno.password }
        })
        .then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
        }); 


        delete aluno.index;

        return aluno;

        console.log(aluno)
      }
      return el;
    });
    vm.alunos = alunos;
    vm.editing = false;

    console.log(alunos)
  }
}


 
function AlunoDetailsController($routeParams, $http, myServiceAluno) {
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
  
  myServiceAluno.async().then(function(d) {

    vm.alunos = d;

  });

  $http({
    method: 'GET'
  ,  responseType:'json'  
  ,  url: '/api/alunos/'+$routeParams.keyId
  })
  .then(function successCallback(response) {
 
      var aluno = response.data;

      vm.alunos.map(function(el, i) {

        if(i ===  $routeParams.id) {
          
          delete el;
          return aluno;

        }
        return el;
      });
      
      vm.alunos = aluno;
      vm.editing = false;


    }, function errorCallback(response) {
      console.log(response);
  });

  // console.log()
  // function getKeyLength() {
  //   return Object.keys(angular.copy(vm.alunos[0])).length;
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

  function add(aluno) {
 
    $http({
      method: 'POST'
    ,  responseType:'json'  
    ,  url: '/api/alunos'
    , data: { email:aluno.email, password:aluno.password }
    })
    .then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
    });

    vm.alunos.push(angular.copy(aluno));
    vm.form = {};
  }
  vm.remove = remove;

  function remove(alunos) {
    vm.alunos = alunos.filter(function(el){ 

    if( el.selecionado ){
      
      $http({
        method: 'DELETE',
        url: '/api/alunos/'+el._id
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
  function edit(aluno, index) {
    vm.form = angular.copy(aluno);
    vm.form.index = index;
    vm.editing = true;
  }

  vm.save = save;
  function save(aluno) {

    var alunos = vm.alunos.map(function(el, i) {

 
      if(i === aluno.index) {

        $http({
          method: 'PUT',
          url: '/api/alunos/'+aluno._id,
          data: { email:aluno.email, password:aluno.password }
        })
        .then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
        }); 


        delete aluno.index;

        return aluno;

      }
      return el;
    });
    vm.alunos = alunos;
    vm.editing = false;

    console.log(alunos)
  }
}