app.factory('authorisation',function($http){

  return {
    auth: function(){
      return $http.get('/check', {
       headers: {'Authorization': 'JWT '+localStorage.getItem("token")}
     });
    }
  }

});
