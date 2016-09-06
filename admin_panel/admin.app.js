angular.module("adminApp", ['ngRoute']);

function config($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
            .when("/admin", {
                templateUrl: "/admin/home/home.html",
                controller: "homeCtrl"
    })
    
            .when("/admin/roomDetail/:roomid",{
                templateUrl: "/admin/roomDetail/roomDetails.html",
                controller: "roomDetailCtrl"
    })
    
            .when("/admin/deleteRoomFeedback",{
                templateUrl: "/admin/feedbacks/deleteRoomFeedback.html",
                controller: "myPostCtrl"
                
    })
            .when("/admin/editRoom/:roomid",{
                templateUrl: "/admin/editRoom/editRoom.html",
                controller: "editRoomCtrl"
                
    })
            .when("/admin/login",{
                templateUrl: "/admin/auth/login/login.html",
                controller: "loginCtrl"
                        //controller: 'navCtrl'
                
    })
            .when("/admin/register",{
                templateUrl: "/admin/auth/register/register.html",
                controller: "registerCtrl"
                
    })
            .when("/admin/logout",{
                templateUrl: "/admin/auth/logout/logout.html",
                controller: "logoutCtrl"
                
    })
           
            .otherwise({redirectTo: "/admin"});
    
};


angular.module("adminApp")
        .config(config);
        