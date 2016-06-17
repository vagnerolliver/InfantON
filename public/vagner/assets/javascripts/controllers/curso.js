 
angular.module('Curso', [])
 
  .controller('CursoController', cursoController)
  // .controller('cursoDetailsController', cursoDetailsController)

  .factory('myServiceCurso', function($http) {
    var promise;
    var myService = {
      async: function() {
        if ( !promise ) {
          promise = $http.get('/api/cursos').then(function (response) {
             return response.data;
          });
        }
         return promise;
       }
    };
    return myService;
  })

 
function cursoController(myServiceCurso,  $http) {

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

  myServiceCurso.async().then(function(d) {
     vm.cursos = d;
  });

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

  function add(curso) {
 
    $http({
      method: 'POST'
    ,  responseType:'json'  
    ,  url: '/api/cursos'
    , data: { name:curso.name, dateBegin:curso.dateBegin, link:curso.link }
    })
    .then(function successCallback(response) {
     
        console.log(response);
     
      }, function errorCallback(response) {
     
        console.log(response);
    
    });

    vm.cursos.push(angular.copy(curso));
    vm.form = {};
  }
  vm.remove = remove;

  function remove(cursos) {
    vm.cursos = cursos.filter(function(el){ 
    
    console.log(el)

    if( el.selecionado ){
      
      $http({
        method: 'DELETE',
        url: '/api/cursos/'+el._id
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
  function edit(curso, index) {
    vm.form = angular.copy(curso);
    vm.form.index = index;
    console.log(index);
    vm.editing = true;
  }

  vm.save = save;
  function save(curso) {
    var cursos = vm.cursos.map(function(el, i) {

      if(i === curso.index) {

        $http({
           method: 'PUT'
        ,  url: '/api/cursos/'+curso._id
        ,  data: { name:curso.name, dateBegin:curso.dateBegin, link:curso.link }
        })
        .then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
            
        }); 


        delete curso.index;

        return curso;
      }
      return el;
    });
    vm.cursos = cursos;
    vm.editing = false;
  }
}
