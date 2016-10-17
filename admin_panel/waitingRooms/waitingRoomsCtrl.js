angular.module("adminApp")
        .controller("waitingRoomsCtrl", waitingRoomsCtrl);

function waitingRoomsCtrl($scope, roomData){
    roomData.getRooms()
        .then(function(response){
            $scope.waitingRooms = response.data;
            //console.log("Success:");
            //console.log(response.data);
        }, function(response){
            console.log("Error");
            $scope.waitingRoomResponseError = response.data;
        });
}

