(function(){
    angular
        .module("adminApp")
        .controller("registerCtrl", ['$location', '$scope', 'adminAuthentication', registerCtrl]);
    
    //registerCtrl.$inject = ['$location', '$scope', 'authentication'];
    function registerCtrl($location, $scope, adminAuthentication){
            if(!adminAuthentication.isLoggedIn()){
                $location.path('/admin');
            };
            $scope.adminRegister = function(user){
            //console.log(user);
            if(user.password === user.password1 && user.tandc === true){
                adminAuthentication.adminRegister(user).success(function(){
                    $location.path("/admin");
                });

            }
            else{
                $scope.message = "Both password should match";
            }
        };
        //$scope.returnPage = $location.search().page || '/'; not used in the way I have used it
    }
})();
        