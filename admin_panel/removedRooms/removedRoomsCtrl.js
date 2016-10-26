/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
    angular.module("adminApp")
        .controller("removedRoomsCtrl", ['$scope', 'roomData','$location','adminAuthentication', removedRoomsCtrl]);

    //waitingRoomsCtrl.$inject = ['$scope', 'roomData'];
    function removedRoomsCtrl($scope, roomData, $location, adminAuthentication){
        if(!adminAuthentication.isLoggedIn()){
            $location.path('/admin');
        };
        roomData.getRemovedRooms()
            .then(function(response){
                $scope.removedRooms = response.data;
                //console.log("Success:");
                //console.log(response.data);
            }, function(response){
                //console.log("Error");
                $scope.removedRoomResponseError = response.data;
            });
    }
})();

