/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
angular
        .module("roomApp")
        .controller("createRoomCtrl", createRoomCtrl);

function createRoomCtrl($location, $scope, $http, authentication, $anchorScroll, $timeout, authentication){
    if(!authentication.isLoggedIn()){
        $location.path("/login");
    };
    $scope.availableOptions = {
        availableBROptions: [1,2,3,4,5],
        availableBillsOption:["included", "excluded"],
        availableGenderOption: ["Couple", "Female", "Male", "No preferred gender"],
        availableFurnishingOption: ["Fully-furnished", "semi-furnished", "Not furnished"],
        availableParkingOption:["Locked garage", "Driveway", "Compound", "Street", "Not Available"],
        availablePropertyOption: ["Apartment", "House"],
        availableBathroomOption: [1,2,3]
    };
    
    $scope.room = {
        totalBedRooms: 2,
        bills: "included",
        gender: "Couple",
        furnishing: "Fully-furnished",
        parking: "Street",
        propertyType: "Apartment",
        totalBathrooms: 1
    };
    
   /*
    $scope.room.totalBedRooms= 2;
    $scope.room.bills= "included";
    $scope.room.gender= "Couple";
    $scope.room.furnishing= "Fully-furnished";
    $scope.room.parking= "Street";
    $scope.room.propertyType= "Apartment";
    $scope.room.totalBathrooms= 1;
    */
    
    $anchorScroll();
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
            //console.log("Amazon Urls: ");
            //console.log($scope.urls);
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
                //console.log("Success");
                //console.log(response);
            }, function(response){
                //console.log("Error Occured");
                //console.log(response);
            });
        };
    };
    
    $scope.register = function(rm){
        $scope.room.imgName = $scope.imageName;
        //console.log("IMage names are : ");
        //console.log($scope.room.imgName);
        console.log("Room Deaails to be posted");
        console.log(rm);
        createRoom(rm);
        
    };
    
    createRoom = function(roomDetails){
        //console.log("Room available from");
        //console.log($scope.room.available_from);
        
        $http({
            method: 'POST',
            url: "/api/rooms",
            data: roomDetails,
            //arrayKey: '',
            headers: {Authorization: 'Bearer '+ authentication.getToken()}
        }).then(function(response){
            $scope.isPosted=true;
            $scope.feedbackMessage="Congratulations! You have successfully listed your room";
            $('#feedback-modal').modal('show');
            $timeout(function(){
                $('.modal-backdrop').remove();
                $location.path("/myPost");
            },2000);
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
        $location.path("/dashboard");
    }; 
    
    /*
    // Javascript for datepicker
    $scope.today = function() {
        $scope.dt = new Date();
    };
    
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.dateOptions = {
      //dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false
      
    };


    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    
    $scope.popup1 = {
      opened: false
    };
    */
}
