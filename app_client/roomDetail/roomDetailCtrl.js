/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("roomDetailCtrl", roomDetailCtrl);

function roomDetailCtrl($http, $routeParams, $scope, roomData, $anchorScroll){
    $anchorScroll();
    //$scope.currentPath = $location.path();
    $scope.roomid = $routeParams.roomid;
    roomData.roomDetail($scope.roomid)
        .success(function(data){
            $scope.oneRoomDetails = data;
            $scope.ORD = $scope.oneRoomDetails;
            //console.log($scope.ORD);
            //console.log("images length is : ");
            //console.log($scope.ORD.images);
            //console.log($scope.ORD.images.length);
            //console.log("First image is : ");
            //console.log($scope.ORD.images[0]);
        })
        .error(function(e){
            //console.log(e);
        });
        
    $scope.sendEmailToOwner = function(emailToOwner){
        var ownerEmail = $scope.ORD.email;
        var roomId = $scope.ORD._id;
        //console.log("Owner email is : " + ownerEmail);
        var emailData = {
            emailToOwner: emailToOwner,
            roomId: roomId,
            ownerEmail: ownerEmail
        };
        console.log(emailData);
        $http({
            method: 'POST',
            url: "/api/sendEmailToOwner",
            data: emailData
        }).then(function(response){
            //console.log("Success : " + response.data);
        }, function(response){
            //console.log("Error: " + response.data);
        });
    };
}