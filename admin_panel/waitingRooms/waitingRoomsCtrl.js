(function(){
    angular.module("adminApp")
        .controller("waitingRoomsCtrl", ['$scope', 'roomData','$location','adminAuthentication', waitingRoomsCtrl]);

    //waitingRoomsCtrl.$inject = ['$scope', 'roomData'];
    function waitingRoomsCtrl($scope, roomData, $location, adminAuthentication){
        if(!adminAuthentication.isLoggedIn()){
            $location.path('/admin');
        };
        roomData.getRooms()
            .then(function(response){
                $scope.waitingRooms = response.data;
                //console.log("Success:");
                //console.log(response.data);
            }, function(response){
                //console.log("Error");
                $scope.waitingRoomResponseError = response.data;
            });
    }
})();

