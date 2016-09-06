
angular
        .module("adminApp")
        .controller("editRoomCtrl", editRoomCtrl);

function editRoomCtrl($location, $scope, $http, $routeParams, authentication){
        var roomid = $routeParams.roomid;
        //console.log("Room id to be edited is : " +roomid);
        
        $http({
            method: "GET",
            url: "/api/rooms/" + roomid
            
        }).then(function success(response){
           // console.log(response.data);
            $scope.room = response.data;
            
           // console.log($scope.room.suburb);
        }, function failure(response){
           // console.log(response.data);
        });  
   
     
    $scope.update = function(room){
        //console.log("Room to be updated is : " + room._id);
        console.log("Room to be updated is : " + room.suburb);
        
       $http.put("/adminApi/rooms/" + room._id, room, {
           headers: {Authorization: 'Bearer '+ authentication.getToken()}
       })
            .then(function(response){
                //console.log("Saved object is : " + response.data);
                $location.path("/admin/myPost");
        }, function(response){
            //console.log("Error respot is : " + response.data);
        });
         
    };
       
    $scope.goHome = function(){
        $location.path("/admin");
    };
    
 
    

}

