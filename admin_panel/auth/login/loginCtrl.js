angular
        .module("adminApp")
        .controller("loginCtrl", loginCtrl);

function loginCtrl($scope, $location, authentication){
    console.log("Login Controller is envoked");
    $scope.login = function(user){
        console.log("login credentials are : " +  user.email, user.password);
        $scope.formError = "";
      if (! $scope.user.adminName || !$scope.user.password) {
        $scope.formError = "All fields required, please try again";
        return false;
      }
      authentication.login(user).success(function(){
          $location.path("/admin");
          
      });
      
        
        $scope.email= "";
        $scope.password = "";
    };
   
}