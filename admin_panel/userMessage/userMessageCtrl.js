angular.module("adminApp")
        .controller("userMessageCtrl", userMessageCtrl);

function userMessageCtrl($scope, userMessage){
    userMessage.getMessage()
        .then(function(response){
            $scope.receivedMessage = response.data;
            //console.log("User Messages are ");
            //console.log(response.data);
    }, function(response){
        //console.log("Error");
    });
}