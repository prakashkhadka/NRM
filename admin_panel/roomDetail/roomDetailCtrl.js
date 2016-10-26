(function(){
angular
        .module("adminApp")
        .controller("roomDetailCtrl", ['$routeParams', '$scope', 'roomData', '$location', 'adminAuthentication', roomDetailCtrl]);

//roomDetailCtrl.$inject = ['$routeParams', '$scope', 'roomData'];
function roomDetailCtrl($routeParams, $scope, roomData, $location, adminAuthentication){
    if(!adminAuthentication.isLoggedIn()){
        $location.path('/admin');
    };
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
        $location.path('/admin/waitingRooms');
    };
}
})();