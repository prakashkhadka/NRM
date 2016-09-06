angular
        .module("adminApp")
        .service("roomData", roomData);

function roomData($http){
    var rmData = function(){
        return $http.get('/api/rooms');
    };
    
    var roomDetail = function(roomid){
        return $http.get("/api/rooms/" + roomid);
        
    };
    
   
    
    
    return {
        rmData : rmData,
        roomDetail : roomDetail
        
        
    };
}
