/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module("roomApp")
        //.controller("forgetPasswordCtrl", forgetPasswordCtrl);
        .controller("forgetPasswordCtrl", ['$scope', '$http', '$location', '$anchorScroll', forgetPasswordCtrl]);  

    //forgetPasswordCtrl.$inject = ['$scope', '$http', '$location', '$anchorScroll'];
    function forgetPasswordCtrl($scope, $http, $location, $anchorScroll){
        $anchorScroll();
        // Following function takes user input for forget password and send to server using POST method
        $scope.forgetPassword =function(forget){
            //console.log("forgotton password is : " + forget.email);
            $http({
                method: 'POST',
                url: "/api/forgottonPassword",
                data: forget
            });
               //$location.path('/fgtPwdResetFeedback');
            };
            $scope.forgetPasswordFeedbackCloseBtn = function(){
                $('.modal-backdrop').remove();
                $location.path("/home");
            };
    }  
})();
