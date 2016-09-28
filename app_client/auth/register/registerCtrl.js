/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
        .module("roomApp")
        .controller("registerCtrl", registerCtrl);


function registerCtrl($location, $scope, authentication, $http, $anchorScroll){
    $anchorScroll();
/*
    Following function checks whether supplied email address is exists in the database or not
 */
    $scope.validateEmail = function(user){
        //console.log("To be validated email is : " + user.email);
        $http({
            method: 'POST',
            url: '/api/validateEmail',
            data: user
        }).then(function success(response){
            //console.log(response.data);
            $scope.emailError = response.data;
            
        }, function failure(response){
            //console.log(response.data);
        });
    };
    
    $scope.hideError = function(){
        $scope.emailError = undefined;
    };
    
    $scope.checkTwoPwd = function(){
        console.log("checkTwoPwd function envoked");
        //console.log("First Password is: " + $scope.newUser.password);
        //console.log("Second Password is: " + $scope.newUser.password1);
        if($scope.newUser.password !== $scope.newUser.password1){
            $scope.pwdMatchError = "Password does not match";
        }
    };
    $scope.removePwdMatchError = function(){
        $scope.pwdMatchError = undefined;
    };
    
    /*
    Following function takes the user register input as user object and sends to server for registration
    using authentiation service. If successful it receives room-token for authentication which is saved on browser's
    temporary memory
 */
    $scope.register = function(user){
    //console.log(user);
    if(user.password === user.password1 && user.tandc === true){
        authentication.register(user).success(function(data){
            $location.path("/");
        }, function(data){
            console.log("Registration Error is : " + data);
            $scope.errorMessage = data;
        }); 
    }
};
    //$scope.returnPage = $location.search().page || '/'; not used in the way I have used it
}
        
        
        