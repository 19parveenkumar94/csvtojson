  var app2=angular.module('app2',['ngRoute']);
  app2.controller('mainCtrl',function($scope){
     var movies=[{title:'ghost rider', name:'johnny blaze'},
                  {title:'agent of shields',name:'remmy rayes'}
  ];
  $scope.movieList=movies;
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
  app2.config(function($routeProvider){
    $routeProvider.when("/ab",{
      templateUrl : 'about.html',
      controller : 'aboutCtrl'
    });
  });
  app2.controller('subCtrl',function($scope){
    $scope.title="luv loves ahmar";

  });
