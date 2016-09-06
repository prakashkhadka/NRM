/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

// Client side routes
angular.module("roomApp")
        .config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
           
            .when("/login",{
                templateUrl: "auth/login/login.html",
                controller: "loginCtrl"
                        //controller: 'navCtrl'
                
    })
            .when("/register",{
                templateUrl: "auth/register/register.html",
                controller: "registerCtrl"
                
    })
            .when("/logout",{
                templateUrl: "auth/logout/logout.html",
                controller: "logoutCtrl"
                
    })
            .when("/myPost",{
                templateUrl: "myPost/myPostTemplate.html",
                controller: "myPostCtrl"
                
    });
    
};
