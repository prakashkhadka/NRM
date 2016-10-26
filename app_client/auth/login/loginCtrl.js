/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module("roomApp")
        .controller("loginCtrl", ['$scope', '$location', 'authentication', '$anchorScroll', loginCtrl]);
        //.controller("loginCtrl", loginCtrl);

    /*
        Following function takes user input as user object which has email and password property and use authentication
        service to send data to the server for authentication
     */
    //loginCtrl.$inject = ['$scope', '$location', 'authentication', '$anchorScroll'];
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
                    $location.path("/dashboard");          
                })
                .error(function(data){
                    $scope.loginError = "Incorrect email or password.";
                    //$scope.loginError = data.message;
                    //console.log("Error occured" + data.message);    
                });
        };
    }  
})();
