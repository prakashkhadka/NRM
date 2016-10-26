(function(){
angular
    .module("adminApp")
    .service("roomData", ['$http', 'adminAuthentication', roomData]);

//roomData.$inject = ['$http'];
function roomData($http, adminAuthentication){
    var getRooms = function(){
        return $http.get('/adminApi/rooms', {
            headers: {Authorization: 'Bearer '+ adminAuthentication.getToken()}});
        /*
        $http({
            url: '/adminApi/rooms',
            method: 'GET'
        });
        */
    };
    
    var getRemovedRooms = function(){
        return $http.get('/adminApi/removedRooms', {
            headers: {Authorization: 'Bearer '+ adminAuthentication.getToken()}});
    };
    
    var roomDetail = function(roomid){
        return $http.get("/adminApi/room/" + roomid, {
            headers: {Authorization: 'Bearer '+ adminAuthentication.getToken()}});
    };
    
    var allowToPublic = function(roomId){
        return $http.get("/adminApi/allowToPublic/" + roomId, {
            headers: {Authorization: 'Bearer '+ adminAuthentication.getToken()}});
    };
   
    return {
        getRooms : getRooms,
        getRemovedRooms : getRemovedRooms,
        roomDetail : roomDetail,
        allowToPublic : allowToPublic 
    };
}
})();