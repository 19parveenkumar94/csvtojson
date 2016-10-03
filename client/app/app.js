//Main module with all the dependencies in the array
var app=angular.module('collaba',['ngRoute','ngMaterial','btford.socket-io']);

//Routes with their Url and controllers
app.config(function($routeProvider){

  $routeProvider.when('/about',{
    templateUrl : 'views/about.html',
    controller : 'aboutCtrl'
  })
  .when('/register',{
    templateUrl:'views/register.html',
    controller : 'registerCtrl',

  }).when('/dummy',{
    templateUrl:'views/dummy.html'
  }).when('/login',{
    templateUrl:'views/login.html',
    controller: 'loginCtrl'
  })
  .when('/chat/:name',{
    templateUrl:'views/chat.html',
    controller: 'chatCtrl'
  });
});
