/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
        .module("roomApp")
        .controller("successFgtPwdResetFeedbackCtrl", successFgtPwdResetFeedbackCtrl);

function successFgtPwdResetFeedbackCtrl($scope, $location){
    $scope.close = function(){
        $location.path('/');
    };
}