//service for login
app.factory('loginService',function($http,$window,authorisation){


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
          localStorage.setItem("token",j);


          var url="#/chat";
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
