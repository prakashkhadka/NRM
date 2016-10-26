/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module("roomApp")
        //.service("roomData", roomData);
        .service("roomData", ['$http', roomData]);
    
    //roomData.$inject = ['$http'];
    function roomData($http){
        var rmData = function(){
            return $http.get('/api/rooms');
        };

        var roomDetail = function(roomid){
            return $http.get("/api/rooms/" + roomid); 
        };

        var createRoom = function(room){
            return $http.post("/api/rooms", room);
        };

        var myRoom = function(cue){
            //console.log("Cue is : " + cue);
            return $http.get("/api/myRoom/" + cue);
        };

        return {
            rmData : rmData,
            roomDetail : roomDetail,
            createRoom : createRoom,
            myRoom : myRoom
        };
    }
})();