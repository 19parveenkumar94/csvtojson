app.controller('registerCtrl',function($scope,registerService){

  $scope.user={};
  $scope.submit=function(){

    registerService.insert($scope.user);


  }
}).controller('aboutCtrl',function(){


}).controller('loginCtrl',function($scope,loginService){
  $scope.user={};
  $scope.login=function(){
    console.log($scope.user);
    loginService.login($scope.user);
  }

}).controller('chatCtrl',function($scope,$routeParams,sockets){

  $scope.username=$routeParams.name;
  $scope.onlineUsers=[];
  sockets.getSocket().emit('login',$routeParams.name);
  sockets.getSocket().on('updatedUserList',function(list){
    $scope.onlineUsers=[];
    angular.forEach(list,function(x){
      if($scope.username!=x.name)
          $scope.onlineUsers.push({id:x.id,name:x.name});
    });
    console.log($scope.onlineUsers);
  });
  $scope.requestForChat=function(name){
    alert(name);
  }
});
