  var app2=angular.module('app2',['ngRoute']);
  app2.controller('mainCtrl',function($scope,shows){
    var movies;
    shows.load().success(function(data){
      movies=data;
      $scope.movieList=movies;
    })
    .error(function(data,status,headers,config){
      console.error(data,status,headers,config);
      if(status === 404)
      window.alert("not found");
      else {
        window.alert("unkonwn");
      }
    })
  //    var movies=[{title:'ghost rider', name:'johnny blaze'},
  //                 {title:'agent of shields',name:'remmy rayes'}
  // ];
  $scope.orderProp='age';
  $scope.movie={};
  $scope.addNew=function(){
    movies.push(angular.copy($scope.movie));
  }
  $scope.isValid=function(){
    if($scope.movie.title==='')
    return false;
    return true;

  }
  $scope.validate=function(){
    if($scope.title.length>0)
    {
      console.log("aOk");

    }
    else {
      window.alert("title is required");
    }
  }
  });
  app2.config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when("/ab/:id",{
      templateUrl : '/extras/about.html',
      controller : 'aboutCtrl'
    });
  });
  app2.controller('subCtrl',function($scope){
    $scope.title="luv loves ahmar";

  });
  app2.controller('aboutCtrl',function($scope,$routeParams){
    console.debug($routeParams.id);
    $scope.id=$routeParams.id;
  });
  angular.module('app2').factory('shows',function($http){
    return {
      load:function(){
        return $http.get('/extras/document.json');
      }
    }
  });
