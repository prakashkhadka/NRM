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
            .when("/", {
                templateUrl: "home/home.html",
                controller: "homeCtrl"
    })
            .when("/roomDetail/:roomid",{
                templateUrl: "roomDetail/roomDetails.html",
                controller: "roomDetailCtrl"
    })
            .when("/createRoom",{
                templateUrl: "createRoom/createRoom.view.html",
                controller: "createRoomCtrl"
    })
            .when("/createRoomFeedback",{
                templateUrl: "feedbacks/createRoomFeedback.html",
                controller: "createRoomCtrl"     
    })
            .when("/deleteRoomFeedback",{
                templateUrl: "feedbacks/deleteRoomFeedback.html",
                controller: "myPostCtrl"   
    })
            .when("/editRoom/:roomid",{
                templateUrl: "editRoom/editRoom.html",
                controller: "editRoomCtrl"   
    }) 
            .when("/roomPagination",{
                templateUrl: "roomPagination/roomPagination.html",
                controller: "roomPaginationCtrl"   
    })
            .when("/searchResult",{
                templateUrl: "searchResult/searchResult.html",
                controller: "searchCtrl"   
    })
            
            .otherwise({redirectTo: "/"});
    
};
