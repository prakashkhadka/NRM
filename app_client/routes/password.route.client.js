/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

// Client side routes
(function(){
    angular.module("roomApp")
            //.config(config);
            .config(['$routeProvider', '$locationProvider', config]);
    
    //config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider       
            .when("/forgetPassword",{
                templateUrl: "auth/forgetPassword/forgetPassword/forgetPasswordTemplate.html",
                controller: "forgetPasswordCtrl"
            })
            .when("/resetForgottonPassword/:receivedToken",{
                templateUrl: "auth/forgetPassword/resetForgottonPassword/resetForgottonPwdTemplate.html",
                controller: "resetForgottonPwdCtrl"
            })
            .when("/changePassword",{
                templateUrl: "auth/changePassword/changePassword/changePasswordTemplate.html",
                controller: "changePasswordCtrl"
            });       
    };
})();