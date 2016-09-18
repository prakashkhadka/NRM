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
            //console.log("images received is: ");
            //console.log($scope.rooms.images);
            
            //$scope.count = 1;
            //console.log("data returned from database :");
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
                $scope.error = response.data;
                // called asynchronously if an error occurs or server returns response with an error status.
          }); 
    $scope.getRooms = function(value){
        //console.log("Value is : " + value);
        $scope.count = [];
        $scope.count.push(value);
        //console.log("Count at getRooms is : " + $scope.count);
        $http({
            method: 'GET',
            url: '/api/roomsByPage/' + value
        }).then(function successCallback(response) {
            $scope.moreRooms = response.data;
            $scope.showMore = true;
            
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
            $scope.error = response.data;
            // called asynchronously if an error occurs or server returns response with an error status.
          });
    };
    
    
}
