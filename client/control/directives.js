angular.module('app3',[])
        .controller('Hello',function($scope){
          $scope.appName="learning it at a faster rate";
          $scope.color='green';
        })
        .directive("helloWorld",function(){


          return {
            scope:{
            apName : '@applicationName'
            },
            template: '<div>{{ apName }}</div>'
          }
        })
        .directive('helmet',function(){
          return{
            scope: {
              color : '@'
            },
            templateUrl: 'img/helmet.svg'
          }
        });
