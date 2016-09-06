/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("createRoomCtrl", createRoomCtrl);

function createRoomCtrl($location, $scope, $http, $rootScope, authentication){
    $scope.beforeChange = function(){
        $scope.compressing = true;
    };
    
    $scope.afterChange = function(){
        $scope.compressing = false;
    };
    
    $scope.deleteFile = function(index){
        $scope.files.splice(index, 1);
    };
    
    $scope.getValue = function(){
        var resultSuburb = [];
        $http({
        method: 'GET',
        url: "js/subs.json"
        }).success(function(data){
            for(var i=0; i< data.subs.length; i++){
                var s = data.subs[i].suburb;
                var pc = data.subs[i].postcode;
                var st = data.subs[i].state;
                resultSuburb.push([s, pc, st]);
                $scope.returnedSub = resultSuburb;
            }
        });
    };
    
    $scope.AssignValueAndHide = function(index){
        $scope.room.suburb = index[0];
        $scope.room.postcode = index[1];
        $scope.room.state = index[2];
        $scope.returnedSub = [];
    };
    
    $scope.getAmazonUrl = function(){
        var fileName = [];
        var fileType = [];
        for(var i= 0; i< $scope.files.length; i++){
           fileName.push(Date.now()+i + '.jpg');
           fileType.push($scope.files[i].type);
        }
        $http({
            url: "/api/amazonUrl",
            method: "POST",
            data: {filename: fileName, type: fileType},
            headers: {Authorization: 'Bearer '+ authentication.getToken()}
        }).then(function(response){
            $scope.urls = response.data;
        });
        $scope.imageName = fileName;
        //console.log($scope.imageName);
    };
       
    $scope.uploadImage = function(){
        for(var i = 0; i < $scope.urls.length; i++){
            $http({
                method: 'PUT',
                url: $scope.urls[i],
                data: $scope.files[i],
                headers: {'Content-Type': $scope.files[i].type}
            }).then(function(response){
                console.log("Success");
                console.log(response);
            }, function(response){
                console.log("Error Occured");
                console.log(response);
            });
        };
    };
    
    $scope.register = function(rm){
        $scope.room.imgName = $scope.imageName;
        console.log("IMage names are : ");
        console.log($scope.room.imgName);
        createRoom(rm);
        
    };
    
    createRoom = function(roomDetails){
         console.log(roomDetails);
        $http({
            method: 'POST',
            url: "/api/rooms",
            data: roomDetails,
            //arrayKey: '',
            headers: {Authorization: 'Bearer '+ authentication.getToken()}
        }).then(function(response){
            $rootScope.reviewData = response.data;
            $location.path("/createRoomFeedback");
        }, function(response){
            $scope.errorMessage = response.data;
        }, function(evt) {
            $scope.progressPercentage = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };
    
    $scope.close = function(){
        $location.path("/myPost");
    };
   
    $scope.goHome = function(){
        $location.path("/");
    }; 
}
