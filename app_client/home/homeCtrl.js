/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
        .module("roomApp")
        .controller("homeCtrl", homeCtrl);

function homeCtrl($scope, $http){
    $http({
          method: 'GET',
          url: '/api/rooms'
        }).then(function successCallback(response) {
            $scope.rooms = response.data;
            $scope.currentPage = 1;
            //console.log("data returned from database :");
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
                $scope.error = response.data;
                // called asynchronously if an error occurs or server returns response with an error status.
          }); 
    $scope.getRooms = function(value){
        //console.log("Value is : " + value);
        $scope.currentPage = value;
        $http({
            method: 'GET',
            url: '/api/roomsByPage/' + value
        }).then(function successCallback(response) {
            $scope.rooms = response.data;
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
            $scope.error = response.data;
            // called asynchronously if an error occurs or server returns response with an error status.
          });
    };
    
    $scope.forward = function(){
        value = $scope.currentPage + 1;
        $scope.currentPage = value;
        //console.log("Value is : " + value);
         $http({
          method: 'GET',
          url: '/api/roomsByPage/' + value
        })
            .then(function successCallback(response) {
            $scope.rooms = response.data;
            //console.log("Rooms returned from server : ");
            //console.log($scope.rooms);
           // console.log("room length is : " + $scope.rooms.length);
            if($scope.rooms.length === 0){
                $scope.endOfPage = true;
            }
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
            $scope.error = response.data;
            // called asynchronously if an error occurs or server returns response with an error status.
          });
    };
    
    $scope.backward = function(){
        var value = $scope.currentPage - 1;
        $scope.currentPage = value;
        //console.log("Value is : " + value);
         $http({
          method: 'GET',
          url: '/api/roomsByPage/' + value
        })
            .then(function successCallback(response) {
            $scope.rooms = response.data;
            if($scope.rooms.length > 0){
                $scope.endOfPage = false;
            }
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
            $scope.error = response.data;
            // called asynchronously if an error occurs or server returns response with an error status.
          });
    };
}
