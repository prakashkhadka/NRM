/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module("roomApp")
        .controller("resetForgottonPwdCtrl", ['$scope', '$http', '$location', '$routeParams', 'authentication', '$anchorScroll', '$timeout', resetForgottonPwdCtrl]);
        //.controller("resetForgottonPwdCtrl", resetForgottonPwdCtrl);

    /*It receives a password reset parameter which was sent to user email from the server as a paramater 
        For this $routeParams dependency is injected into the controller. 
        It send the password reset token back to the server alongwith newPassword entered by the user.
        On the serverside mongoose method is used to find the token saved on the mongodb. If it finds the token
        on database, it goes further to change and save password.
     */
    //resetForgottonPwdCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'authentication', '$anchorScroll', '$timeout'];
    function resetForgottonPwdCtrl($scope, $http, $location, $routeParams, authentication, $anchorScroll, $timeout){
        $anchorScroll();
        $scope.receivedToken = $routeParams.receivedToken;
        //console.log("RT : " + $scope.receivedToken);
        //console.log("User is : " + user);
        $scope.change = function(newPassword){
            if($scope.newPassword.newPassword1 !== $scope.newPassword.newPassword2){
            $scope.passwordError = "Both Password should match";
            return;
        }
        else{
            var data = {
                token : $scope.receivedToken,
                newPassword: $scope.newPassword
            };
            //console.log("Sent token to server : " + data.token);
            //console.log("Process goes further");
            $http({
                method: "POST",
                url: "/api/doReset",
                data: data
            }).then(function success(response){
                //console.log("Received JWT is : " + response.data.token);
                authentication.saveToken(response.data.token);
                $scope.isForgottonPasswordReset = true;
                    $scope.feedbackMessage = "Congratulations ! Your password is changed.";
                    $('#feedback-modal').modal('show');
                    $timeout(function(){
                        $('.modal-backdrop').remove();
                        $location.path("/dashboard");
                    },2000);
                //$location.path('/successFgtPwdResetFeedback');
            }, function failure(respose){
                $scope.message = "Could not reset your password";
            });
            //console.log("Password sent to reset is : " + data.newPassword.newPassword1);
        }
        };   
    };  
})();
