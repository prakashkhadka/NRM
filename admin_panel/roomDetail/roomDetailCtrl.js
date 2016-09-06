angular
        .module("adminApp")
        .controller("roomDetailCtrl", roomDetailCtrl);

function roomDetailCtrl($routeParams, $scope, roomData){
    $scope.roomid = $routeParams.roomid;
    roomData.roomDetail($scope.roomid)
            .success(function(data){
                $scope.oneRoomDetails = data;
                $scope.ORD = $scope.oneRoomDetails;
            })
            .error(function(e){
                console.log(e);
            });
   
    
}