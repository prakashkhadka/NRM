(function(){
    angular
            .module("adminApp")
            .controller("loginCtrl", ['$scope', '$location', 'adminAuthentication', loginCtrl]);
    
    //loginCtrl.$inject = ['$scope', '$location', 'adminAuthentication']
    function loginCtrl($scope, $location, adminAuthentication){
        
        //console.log("Login Controller is envoked");
        $scope.adminLogin = function(admin){
            //console.log("login credentials are : " +  admin.adminName, admin.password);
            $scope.formError = "";
            if (! $scope.admin.adminName || !$scope.admin.password) {
                $scope.formError = "All fields required, please try again";
                return false;
            }
            adminAuthentication.adminLogin(admin).then(function(){
                console.log("Admin Login Successful");
                $location.path("/admin/adminDashboard");
            });
                $scope.adminName= "";
                $scope.password = "";
        };

    }
})();