angular
        .module("adminApp")
        .controller("loginCtrl", loginCtrl);

function loginCtrl($scope, $location, adminAuthentication){
    if(adminAuthentication.isLoggedIn()){
        $location.path('/admin/adminDashboard');
    }
    //console.log("Login Controller is envoked");
    $scope.adminLogin = function(admin){
        //console.log("login credentials are : " +  admin.adminName, admin.password);
        $scope.formError = "";
        if (! $scope.admin.adminName || !$scope.admin.password) {
            $scope.formError = "All fields required, please try again";
            return false;
        }
        adminAuthentication.adminLogin(admin).then(function(){
            $location.path("/admin/adminDashboard");

        });
            $scope.adminName= "";
            $scope.password = "";
    };
   
}
