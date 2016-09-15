/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("roomDetailCtrl", roomDetailCtrl);

function roomDetailCtrl($routeParams, $scope, $location, roomData){
    $scope.hideHome = true;
    $scope.currentPath = $location.path();
    $scope.roomid = $routeParams.roomid;
    roomData.roomDetail($scope.roomid)
        .success(function(data){
            $scope.oneRoomDetails = data;
            $scope.ORD = $scope.oneRoomDetails;
            //console.log($scope.ORD);
        })
        .error(function(e){
            //console.log(e);
        });
}