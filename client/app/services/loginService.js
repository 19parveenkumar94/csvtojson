//service for login
app.factory('loginService',function($http,$window){


  return{
    login: function(user){
      $http.post("/token",user)
      .then(
        //success
        function(data,status,config)
        {
          var j = JSON.stringify(data);
          j = JSON.parse(j);
          j = j.data.token;
          console.log(j);
          alert("success login");
          var url="#/chat/"+user.username;
          $window.location.href=url;
        },
        //failure
        function(data,status,config)
        {
            alert("fail login");
            $window.location.href="/#/login"
        }
      );
    }
  }

});
