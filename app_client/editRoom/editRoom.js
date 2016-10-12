/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("editRoomCtrl", editRoomCtrl);

function editRoomCtrl($location, $scope, $http, $routeParams, authentication, $anchorScroll, $timeout){
    if(!authentication.isLoggedIn()){
        $location.path("/login");
    };
    $anchorScroll();
    var roomid = $routeParams.roomid;
    //console.log("Room id to be edited is : " +roomid);
    $http({
        method: "GET",
        url: "/api/rooms/" + roomid
    }).then(function(response){
        console.log(response.data);
        $scope.room = response.data;
       // console.log($scope.room.suburb);
    }, function(response){
       // console.log(response.data);
    });  
    $scope.availableOptions = {
        availableBROptions: [1,2,3,4,5],
        availableBillsOption:["included", "excluded"],
        availableGenderOption: ["Couple", "Female", "Male", "No preferred gender"],
        availableFurnishingOption: ["Fully-furnished", "semi-furnished", "Not furnished"],
        availableParkingOption:["Locked garage", "Driveway", "Compound", "Street", "Not Available"],
        availablePropertyOption: ["Apartment", "House"],
        availableBathroomOption: [1,2,3]
    };
    $scope.update = function(room){
        //console.log("Room to be updated is : " + room._id);
        //console.log("Room to be updated is : " + room.suburb);
        $http.put("/api/rooms/" + room._id, room, {
            headers: {Authorization: 'Bearer '+ authentication.getToken()}
        }).then(function(response){
                //console.log("Saved object is : " + response.data);
                $scope.isEdited= true;
                $scope.feedbackMessage = "Your room is successfully edited.";
                $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('.modal-backdrop').remove();
                    $location.path("/myPost");
                },2000);
        }, function(response){
            //console.log("Error respot is : " + response.data);
        });   
    };
       
    $scope.goHome = function(){
        $location.path("/dashboard");
    };
}

