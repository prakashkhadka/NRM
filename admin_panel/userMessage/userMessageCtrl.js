(function(){
    angular.module("adminApp")
            .controller("userMessageCtrl", ['$scope', 'userMessage','$location', 'adminAuthentication', userMessageCtrl]);

    //userMessageCtrl.$inject = ['$scope', 'userMessage'];
    function userMessageCtrl($scope, userMessage, $location, adminAuthentication){
        if(!adminAuthentication.isLoggedIn()){
            $location.path('/admin');
        };
        userMessage.getMessage()
            .then(function(response){
                $scope.receivedMessage = response.data;
                //console.log("User Messages are ");
                //console.log(response.data);
        }, function(response){
            //console.log("Error");
        });
    }
})();