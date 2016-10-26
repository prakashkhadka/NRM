/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
angular.module('roomApp')
        .controller('footerCtrl', ['$scope', '$http', '$window', '$anchorScroll', footerCtrl]);
        //.controller('footerCtrl', footerCtrl);

//footerCtrl.$inject = ['$scope', '$http', '$window', '$anchorScroll'];
function footerCtrl($scope, $http, $window, $anchorScroll){
    $scope.sendMessage = function(msg){
        $http({
            method: 'POST',
            url: '/api/contactUs',
            data: msg
        }).then(function(response){
            $('#contactUSModal').modal('show');
        }, function(response){
            //console.log("Error : " + response.data);
        });
    };
    $scope.closeContactUsModal = function(){
        $anchorScroll();
        //console.log("closeContactUsModal function is working");
        $window.location.reload(); 
    };
}
})();
