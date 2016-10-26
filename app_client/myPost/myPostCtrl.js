/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module("roomApp")
        //.controller("myPostCtrl", myPostCtrl);
        .controller("myPostCtrl", ['$scope', '$http', '$location', 'authentication', '$anchorScroll', '$timeout', '$window', myPostCtrl]);  

    //myPostCtrl.$inject = ['$scope', '$http', '$location', 'authentication', '$anchorScroll', '$timeout', '$window'];
    function myPostCtrl($scope, $http, $location, authentication, $anchorScroll, $timeout, $window){
        if(!authentication.isLoggedIn()){
            $location.path("/login");
        };
        $anchorScroll();
        $scope.isDeleted=false;
        //console.log("myPostCtrl is working");
        //To find current loggedin user uses authentication service in services/authentication.service.js file. It uses currentUser method

        var currentUser = authentication.currentUser();
        // Gets email address from currentUser method of authentication service
        var currentUserEmail = currentUser.email;
        //console.log("Current User email is : " + currentUserEmail);
        //Uses roomData services to get the rooms posted by current user based on email address because email address is unique on database 
        //Passes email address as parameter in roomData.myRoom service
        //.roomData.myRoom(currentUserEmail);
        $http.get("/api/myRoom/" + currentUserEmail, {headers: {Authorization: 'Bearer '+ authentication.getToken()}})
            .success(function(data){
            //console.log("Rooms returnd from server : " + data[1].suburb);
            $scope.roomsByUser = data;
            for(var i=0; i<data.length; i++){
                $scope.usersRoom = data[i];
                //console.log($scope.usersRoom);
            }
        }, function(data){
            //console.log("Couldn't get room detail from server : " + data);
        });
        //confirms room delete action -by rajesh
          $scope.confirm=function(roomid){
            $scope.confirmedRoomId=roomid;
            $('#confirmation-modal').modal('show');
          };
        // end of room delete confirmation action method

    // following function deletes individual room and takes to feedback page
          // this function is associated with delete button on home page
        $scope.remove = function(roomid){
            //console.log("Room id to be delted is : " + roomid);
            $('#confirmation-modal').modal('hide');
            $http({
                method: "GET",
                url: "/api/removeRoom/" + roomid,
                headers: {Authorization: 'Bearer '+ authentication.getToken()}
            }).then(function(response){
               //console.log("Deleted room data is : " + response);
               //console.log("Room deletion confirmation");
               //console.log(response.data);
               $scope.isDeleted=true;
               $scope.feedbackMessage="Successfully removed.";
               $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('#feedback-modal').modal('hide');
                    $('.modal-backdrop').remove();
                    $window.location.reload();
                },2000);
            },function failure(response){
                $scope.isDeleted=false;
                $scope.feedbackMessage="Sorry, somehing went wrong.Try again.";
                $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('.modal-backdrop').remove();
                    $location.path("/myPost");
                },2000);
            });
        };
          /*
        $scope.remove = function(roomid){
            //console.log("Room id to be delted is : " + roomid);
            $('#confirmation-modal').modal('hide');
            $http({
                method: "DELETE",
                url: "/api/rooms/" + roomid,
                headers: {Authorization: 'Bearer '+ authentication.getToken()}
            }).then(function(response){
               //console.log("Deleted room data is : " + response);
               //console.log("Room deletion confirmation");
               //console.log(response.data);
               $scope.isDeleted=true;
               $scope.feedbackMessage="Successfully removed.";
               $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('#feedback-modal').modal('hide');
                    $('.modal-backdrop').remove();
                    $window.location.reload();
                },2000);
            },function failure(response){
                $scope.isDeleted=false;
                $scope.feedbackMessage="Sorry, somehing went wrong.Try again.";
                $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('.modal-backdrop').remove();
                    $location.path("/myPost");
                },2000);
            });
        };
        */
    };
})();