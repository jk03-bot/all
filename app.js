const app=angular.module("Myapp",[]);
app.controller("Mycontroller",['$scope','Service',function($scope,Service)
{
    $scope.foods=[];
    $scope.newFood={};
    $scope.searchQuery="";
    Service.getfood().then(function(response){
        $scope.foods=response.data;
    });
    $scope.addFood=function(){
        Service.addFood($scope.newFood).then(function(response){
            $scope.foods.push(response.data);
            $scope.newFood={};
        });
    };
    $scope.deleteFood=function(foodId){
        Service.deleteFood(foodId).then(function(){
        $scope.foods=$scope.foods.filter(food=>food._id!==foodId);
        });
    };
}]);
app.factory('Service',['$http',function($http){
const FS={};
FS.getfood=function(){
    return $http.get('/api/food');
};
FS.addFood=function(food){
    return $http.post('/api/food',food);
};
FS.deleteFood=function(foodId){
    return $http.delete('/api/food/'+foodId);
};
 return FS;
}]);
