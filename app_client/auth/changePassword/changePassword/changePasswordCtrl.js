/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

//This controller has been used to change password of already logged in user.
angular
        .module("roomApp")
        .controller("changePasswordCtrl", changePasswordCtrl);

function changePasswordCtrl($scope, $location, $http, authentication, $anchorScroll, $timeout){
    if(!authentication.isLoggedIn()){
        $location.path("/login");
    };
    $anchorScroll();
    $scope.changePassword = function(pwd){
        var isLoggedIn = authentication.isLoggedIn();
        //console.log("Change password new password is : " + pwd.confirmPassword);
        if(pwd.newPassword !== pwd.confirmPassword){
            $scope.errorMessage = "Both password should match";
        }
        else if(!isLoggedIn){
            $scope.errorMessage("You must be loggedIn to change password.");
        }
        else{
            var currentUser = authentication.currentUser();
            var userEmail = currentUser.email;
            //console.log("Current User email is : " + userEmail);
            //user email is also sent to server to find the user because user email is unique in the database
            var data = {
                pwd : pwd,
                userEmail : userEmail
            };
            //only authenticated users can change their password. This is implemented by supplying token as headers
            $http({
                method: "POST",
                url: '/api/changePassword',
                data: data,
                headers: {Authorization: 'Bearer '+ authentication.getToken()}
            }).then(function(response){
                //console.log("Success Function" + response.data);
                $scope.isPasswordChanged= true;
                $scope.feedbackMessage = "Your password is successfully changed.";
                $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('.modal-backdrop').remove();
                    $location.path('/dashboard');
                },1500);
            }, function(response){
                $scope.errorMessage = "Something went wrong. Please try again.";
                //console.log("Failure response is: " + response.data);
            });
        }
    };
}