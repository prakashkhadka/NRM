/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("roomDetailCtrl", roomDetailCtrl);

function roomDetailCtrl($routeParams, $scope, $location, roomData){
    
    $scope.currentPath = $location.path();
    $scope.roomid = $routeParams.roomid;
    roomData.roomDetail($scope.roomid)
        .success(function(data){
            $scope.oneRoomDetails = data;
            $scope.ORD = $scope.oneRoomDetails;
            //console.log($scope.ORD);
            console.log("images length is : ");
            console.log($scope.ORD.images);
            console.log($scope.ORD.images.length);
        })
        .error(function(e){
            //console.log(e);
        });
}