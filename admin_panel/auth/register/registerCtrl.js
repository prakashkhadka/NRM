angular
        .module("adminApp")
        .controller("registerCtrl", registerCtrl);

function registerCtrl($location, $scope, authentication){
        $scope.adminRegister = function(user){
        //console.log(user);
        if(user.password === user.password1 && user.tandc === true){
            authentication.adminRegister(user).success(function(){
                $location.path("/admin");
            });
            
        }
        else{
            $scope.message = "Both password should match";
        }
    };
    //$scope.returnPage = $location.search().page || '/'; not used in the way I have used it
}
        