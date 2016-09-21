/*
 * Created by Rajesh Basnet
 
 * copyright: sproutTech Australia
 */

angular.module( "roomApp")
    .controller("searchCtrl", searchCtrl);
    
    function searchCtrl($scope, $http, $location){
        
        $scope.addressSearch =  function(adrs){
            
            //$location.path('/roomSearch');
            //console.log("Search value is : " + adrs.searchValue);
            var stateList = [{
                fullName: 'Western Australia',
                alias: 'WA'
              }, {
                fullName: 'South Australia',
                alias: 'SA'
              }, {
                fullName: 'Tasmania',
                alias: 'TAS'
              }, {
                fullName: 'Victoria',
                alias: 'VIC'
              }, {
                fullName: 'Queensland',
                alias: 'QLD'
              }, {
                fullName: 'New South Wales',
                alias: 'NSW'
              }, {
                fullName: 'Australian Capital Territorry',
                alias: 'ACT'
              }, {
                fullName: 'Northern Territorry',
                alias: 'NT'
            }];
            var searchThing = adrs.searchValue;
            //console.log("search thing is : ");
            //console.log(searchThing);
            var queryString = searchThing.trim();
                //console.log("Query String is : " + queryString);
            
            //1. POST CODE  
            //check for post code and grab/remove from query string if exist string
            var regPostCode = new RegExp("\\b\\d{4}\\b");
            var postCode = queryString.match(regPostCode);
            if (postCode !== null) {
              var postCode = postCode[0];
             // console.log("Postcode is : " + postCode);
              queryString = queryString.replace(postCode[0], "");
            }
            
           // 2. STATE
            //check for state and grab/remove from query string if exist
            if (queryString.length > 0) {
              //iterate thourgh stateList and grab first occured state  but remove rest 
              for (var i = 0; i < stateList.length; i++) {
                var regState = new RegExp("\\b(" + stateList[i].alias + "|" + stateList[i].fullName + ")\\b", "ig");
                var state = queryString.match(regState);
                if (state !== null) {
                  state = stateList[i].alias;
                  //console.log("Search State is : " + state);
                  queryString = queryString.replace(stateList[i].fullName, "");
                  queryString = queryString.replace("Australia", "");
                  //console.log("Query list upto here " + queryString);
                  break;
                }
              }
            }
            
            //3. SUBURB
            //check for suburb and grab/remove from query string if exist
            if (queryString.length > 0) {
              // sanitise non alphanumeric characters except space and remove digits as well
              //var regSuburb = new RegExp("[^a-zA-Z\\s]","g");
              var regSuburb = new RegExp("[^a-zA-Z\\-\\s]", "g");
              var suburb = queryString.replace(regSuburb,"").trim();
              //console.log("Suburb is : " + suburb);
              //console.log("Type of input value is : " + typeof(adrs.searchValue));
              //console.log("Type of input regex : " + typeof(suburb));
              /*
              if(adrs.searchValue === suburb){
                  console.log("They are identical");
                  
              }
              else{
                  console.log("They are NOT identical");
              }
              */
            }
            
            var searchData = {
                postCode : postCode,
                state : state,
                suburb : suburb
            };
            console.log("Search data : ");
            console.log(searchData);
            $http({
                method:'POST',
                url: '/api/roomSearch',
                data: searchData
            }).success(function(data){
                $scope.searchedRoom = data;
                $scope.hideHome = true;
                
                //$scope.hideRoomDetailsSection = $scope.oneRoomDetails;
                console.log("Search data received from server : ");
                //console.log(data.searchData);
                console.log($scope.searchedRoom);
                
            }).error(function(data){
                //console.log("Error" + data);
            });
            
            //console.log("Room Search data sent to server is : "  + searchData.suburb);
        };
    }