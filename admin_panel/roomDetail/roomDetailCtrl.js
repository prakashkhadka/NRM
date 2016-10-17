angular
        .module("adminApp")
        .controller("roomDetailCtrl", roomDetailCtrl);

function roomDetailCtrl($routeParams, $scope, roomData){
    var roomid = $routeParams.roomid;
    //console.log("Route paramas is: " + roomid);
    roomData.roomDetail(roomid)
        .then(function(response){
            //console.log("Success");
            //console.log(response.data);
            var oneRoomDetails = response.data;
            $scope.ORD = oneRoomDetails;
    }, function(response){
        //console.log("Error");
    });
    
    $scope.allowToPublic = function(roomId){
        //console.log("Room id allowed : " + roomId);
        roomData.allowToPublic(roomId);
    };
}