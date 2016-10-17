angular
        .module("adminApp")
        .service("roomData", roomData);

function roomData($http){
    var getRooms = function(){
        return $http.get('/adminApi/rooms');
        /*
        $http({
            url: '/adminApi/rooms',
            method: 'GET'
        });
        */
    };
    
    var roomDetail = function(roomid){
        return $http.get("/adminApi/room/" + roomid);
    };
    
    var allowToPublic = function(roomId){
        return $http.get("/adminApi/allowToPublic/" + roomId);
    };
   
    
    
    return {
        getRooms : getRooms,
        roomDetail : roomDetail,
        allowToPublic : allowToPublic 
    };
}
