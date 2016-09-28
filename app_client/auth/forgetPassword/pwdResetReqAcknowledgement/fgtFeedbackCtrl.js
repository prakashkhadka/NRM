/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
        .module("roomApp")
        .controller("fgtFeedbackCtrl", fgtFeedbackCtrl);

function fgtFeedbackCtrl($scope, $location, $anchorScroll){
    $anchorScroll();
    $scope.feedBackClose = function(){
        $location.path("/");
    };
   
};