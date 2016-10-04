app.controller('registerCtrl',function($scope,registerService){

  $scope.user={};
  $scope.submit=function(){

    registerService.insert($scope.user);


  }
}).controller('aboutCtrl',function(){


}).controller('loginCtrl',function($scope,loginService){
  $scope.user={};
  $scope.login=function(){
    //console.log($scope.user);
    loginService.login($scope.user);
  }

}).controller('chatCtrl',function($scope,$window,sockets,authorisation,jwtHelper){
    authorisation.auth().success(function(data){

        alert("succecctoken " );


    }).error(function(data){
    //  alert("not authorised");
      $window.location.href="/#/login"

    });


  $scope.username=jwtHelper.decodeToken(localStorage.getItem("token")).name;
  $scope.onlineUsers=[];
  $scope.requests=[];
  $scope.chats=[];

  if($scope.username!="")
  sockets.getSocket().emit('login',$scope.username);
  sockets.getSocket().on('updatedUserList',function(list){
    $scope.onlineUsers=[];
    angular.forEach(list,function(x){
      if($scope.username!=x.name)
          $scope.onlineUsers.push({id:x.id,name:x.name});
    });

  });
  sockets.getSocket().on('recieveRequest',function(name){
    $scope.requests.push(name);
  });
  sockets.getSocket().on('accepted',function(sender){
    $scope.obj={'sender':$scope.username,'reciever':sender};
    $scope.obj['messages']=[];
    $scope.obj['messages'].push({'sender':$scope.username,'message':"pradhan"});
    $scope.chats.push($scope.obj);
  });
  sockets.getSocket().on('sendMessageToReciever',function(sender,msg){
      angular.forEach($scope.chats,function(x){
        if((x.sender==$scope.username&&x.reciever==sender)||(x.sender==sender&&x.reciever==$scope.username))
        {
          x.messages.push({'sender':sender,message:msg});
        }
      });
  });
  $scope.sendMessage=function(sender,reciever){
    var sa="textBox"+reciever+"";

    angular.forEach($scope.chats,function(x){
      if(x.sender==sender)
      {
        x.messages.push({'sender':sender,'message':document.getElementById(sa).value});


      }
    });
    sockets.getSocket().emit("sendMessage",sender,reciever,document.getElementById(sa).value);
    document.getElementById(sa).value="";
  };
  $scope.acceptRequest=function(name){
    $scope.requests.splice($scope.requests.indexOf(name),1);
    $scope.obj={'sender':$scope.username,'reciever':name};
    $scope.obj['messages']=[];
    $scope.obj['messages'].push({"sender":$scope.username,'message':"pradhan"});
    $scope.chats.push($scope.obj);
     sockets.getSocket().emit('acceptedRequest',name,$scope.username);
  };
  $scope.requestForChat=function(name){
    sockets.getSocket().emit('requestForChat',name,$scope.username);
  };
});
