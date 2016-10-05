/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("myPostCtrl", myPostCtrl);

function myPostCtrl($scope, $http, $location, authentication, $anchorScroll,$timeout){
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
    $http.get("/api/myRoom/" + currentUserEmail, {headers: {Authorization: 'Bearer '+ authentication.getToken()}}).success(function(data){
        //console.log("Rooms returnd from server : " + data[1].suburb);
        $scope.roomsByUser = data;
        for(var i=0; i<data.length; i++){
            $scope.usersRoom = data[i];
        }
    }, function(data){
        //console.log("Couldn't get room detail from server : " + data);
    });
    

    //confirms room delete action -by rajesh

      $scope.confirm=function(roomid){

        $scope.confirmedRoomId=roomid;
        $('#confirmation-modal').modal('show');



      }






    // end of room delete confirmation action method

    // following function deletes individual room and takes to feedback page
          // this function is associated with delete button on home page
            $scope.remove = function(roomid){
                //console.log(roomid);
                
                $http({
                    method: "DELETE",
                    url: "/api/rooms/" + roomid,
                    headers: {Authorization: 'Bearer '+ authentication.getToken()}
                })
               .then(function success (response){
                   //console.log("Deleted room data is : " + response);

                   $scope.isDeleted=true;
                   $scope.feedbackMessage="Successfully deleted the room.";
                   $('#confirmation-modal').modal('hide');
                   $('#feedback-modal').modal('show');
//                    $timeout(function(){
// $('#confirmation-modal').modal('hide');
// $('#feedback-modal').modal('show');

//         },4000);
        
                   
                  // $location.path("/deleteRoomFeedback");
                   //$location.path("/about");
                   
                }, function failure(response){

                  $scope.isDeleted=false;
                  $scope.feedbackMessage="Sorry, somehing went wrong.Try again.";
                   $('#confirmation-modal').modal('hide');
                   $('#feedback-modal').modal('show');
           //$scope.errorMessage = response.data;
           //console.log(response);
                });
          };
          
          // this function closes the feedback message on feedbacks/createRoomFeedback page
          // this function is associated with close button on above mentioned page
          $scope.close = function(){
              $location.path("/myPost");
          };
    
}