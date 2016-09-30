var app1=angular.module('app1',[]);
app1.controller('ctrl1',function($scope){
  $scope.first=1;
  $scope.second=1;

  $scope.updateValue=function()
  {
    $scope.calculation=$scope.first+" "+$scope.second+" = "+(+$scope.first+ +$scope.second);
  }
});
app1.controller('ctrl2',function($scope){
  $scope.randomNum1=Math.floor(Math.random()*10 +1);
  $scope.randomNum2=Math.floor(Math.random()*10 +1);

});
app1.controller('gList',function($scope){

  $scope.groceries=[
    {item:'tomatoes',purchased:false},
    {item:'tomat',purchased:false},
    {item:'apples',purchased:false},
    {item:'asd',purchased:false},
    {item:'tomatoes',purchased:false},


  ];

$scope.getList=function(){
  return $scope.showList ? "groceriesul.html":"groceriesol.html";
};
});
