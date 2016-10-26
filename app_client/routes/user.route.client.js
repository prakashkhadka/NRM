/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

// Client side routes
(function(){
    angular.module("roomApp")
            //.config(userConfig);
            .config(['$routeProvider', '$locationProvider', userConfig]);

    //userConfig.$inject = ['$routeProvider', '$locationProvider'];
    function userConfig($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/login",{
                templateUrl: "auth/login/login.html",
                controller: "loginCtrl"       
            })
            .when("/register",{
                templateUrl: "auth/register/register.html",
                controller: "registerCtrl"      
            })
            .when("/logout",{
                templateUrl: "auth/logout/logout.html",
                controller: "logoutCtrl"         
            })
            .when("/dashboard",{
                templateUrl: "dashboard/dashboard.html",
                controller: "myPostCtrl"      
            })
            .when("/myPost",{
                templateUrl: "myPost/myPostTemplate.html",
                controller: "myPostCtrl"         
            });  
    };
})();
