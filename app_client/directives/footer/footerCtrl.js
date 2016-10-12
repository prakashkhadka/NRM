/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('roomApp')
        .controller('footerCtrl', footerCtrl);

function footerCtrl($scope, $http, $window, $anchorScroll){
    $scope.sendMessage = function(msg){
        $http({
            method: 'POST',
            url: '/api/contactUs',
            data: msg
        }).then(function(response){
            $('#contactUSModal').modal('show');
            //$scope.contactUs.name = undefined;
            //$scope.contactUs.email = undefined;
            //$scope.contactUs.message = undefined;
            //$window.location.reload();
            //$scope.messageSubmitted = true;
            //console.log("Success : " + response.data);
        }, function(response){
            //console.log("Error : " + response.data);
        });
    };
    $scope.closeContactUsModal = function(){
        $anchorScroll();
        console.log("closeContactUsModal function is working");
        $window.location.reload(); 
    };
}

