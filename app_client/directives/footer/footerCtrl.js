/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('roomApp')
        .controller('footerCtrl', footerCtrl);

function footerCtrl($scope, $http){
    $scope.sendMessage = function(msg){
        $http({
            method: 'POST',
            url: '/api/contactUs',
            data: msg
        }).then(function(response){
            console.log("Success : " + response);
        }, function(response){
            console.log("Error : " + response);
        });
    };
}