(function(){
angular
        .module("adminApp")
        .controller("homeCtrl", ['$location', '$scope', '$http', 'adminAuthentication', homeCtrl]);

//homeCtrl.$inject = ['$location', '$scope', '$http', 'authentication'];
function homeCtrl($location, $scope, $http, adminAuthentication){
    //console.log("Home Controller is loaded");
    if(!adminAuthentication.isLoggedIn()){
        $location.path('/admin');
    };
    $http({
          method: 'GET',
          url: '/api/rooms'
        }).then(function successCallback(response) {
            $scope.rooms = response.data;
            //console.log(response.data);
            // this callback will be called asynchronously when the response is available
          }, function errorCallback(response) {
            $scope.error = response.data;
            // called asynchronously if an error occurs or server returns response with an error status.
          });
          
          
          $scope.remove = function(roomid){
                //console.log(roomid);
                $http({
                    method: "DELETE",
                    url: "/adminApi/rooms/" + roomid,
                    headers: {Authorization: 'Bearer '+ adminAuthentication.getToken()}
                })
               .then(function success (response){
                   console.log("Deleted room data is : " + response);
                   
                   $location.path("/deleteRoomFeedback");
                   //$location.path("/about");
                   
                }, function failure(response){
           //$scope.errorMessage = response.data;
           //console.log(response);
                });
          };
         
}
})();
