/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

//controller for change password feedback
angular
        .module("roomApp")
        .controller("changePasswordFeedbackCtrl", changePasswordFeedbackCtrl);

function changePasswordFeedbackCtrl($scope, $location){
    $scope.close = function(){
        $location.path("/");
    };
}