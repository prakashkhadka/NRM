/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
        .module("roomApp")
        .controller("loginCtrl", loginCtrl);

/*
    Following function takes user input as user object which has email and password property and use authentication
    service to send data to the server for authentication
 */

function loginCtrl($scope, $location, authentication, $anchorScroll){
    $anchorScroll();
    $scope.login = function(user){
        //console.log("supplied email is : " + user.email);
        //console.log("Supplied password is : " + user.password);
        if(!user.email || !user.password){
          $scope.loginError = "All fields required, please enter both fields";
        }
        authentication.login(user)
            .success(function(){
                $location.path("/");          
            })
            .error(function(data){
                $scope.loginError = data.message;
                //console.log("Error occured" + data.message);    
            });
    };
}
