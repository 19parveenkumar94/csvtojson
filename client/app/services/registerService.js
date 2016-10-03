//Service for registration
app.factory('registerService',function($http,$window){

  //all the below properties will be available to controller
  return{
    insert: function(user){
      $http.post("/registerUser",user)
      .then(
        //on Success
        function(data,status,config)
        {
          alert(status+"success");
          $window.location.href="/#/login"
        },
        //on failure
        function(data,status,config)
        {
            alert("fail"+status);
            $window.location.href="/#/register"
        }
      );
    }
  }

});
