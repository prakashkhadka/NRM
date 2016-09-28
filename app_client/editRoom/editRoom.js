/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("editRoomCtrl", editRoomCtrl);

function editRoomCtrl($location, $scope, $http, $routeParams, authentication, $anchorScroll){
    $anchorScroll();
        var roomid = $routeParams.roomid;
        //console.log("Room id to be edited is : " +roomid);
        $http({
            method: "GET",
            url: "/api/rooms/" + roomid
            
        }).then(function(response){
           // console.log(response.data);
            $scope.room = response.data;
            
           // console.log($scope.room.suburb);
        }, function(response){
           // console.log(response.data);
        });  
   
    $scope.update = function(room){
        //console.log("Room to be updated is : " + room._id);
        //console.log("Room to be updated is : " + room.suburb);
        $http.put("/api/rooms/" + room._id, room, {
            headers: {Authorization: 'Bearer '+ authentication.getToken()}
        }).then(function(response){
                //console.log("Saved object is : " + response.data);
                $location.path("/myPost");
        }, function(response){
            //console.log("Error respot is : " + response.data);
        });   
    };
       
    $scope.goHome = function(){
        $location.path("/");
    };
}

