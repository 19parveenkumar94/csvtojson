angular.module('app2').factory('shows',function($http){
  return {
    load:function(){
      return $http.get('document.json');
    }
  }
});
