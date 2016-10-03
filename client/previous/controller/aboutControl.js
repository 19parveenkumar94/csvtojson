var app=angular.module('app2',[]);
app.controller('aboutCtrl',function($scope,$routeParams){
  console.debug($routeParams.id);
});
