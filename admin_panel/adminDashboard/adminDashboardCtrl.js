angular.module("adminApp")
        .controller("adminDashboardCtrl", adminDashboardCtrl);

function adminDashboardCtrl($scope, $location, adminAuthentication){
    /*
    if(!$scope.isLoggedIn){
        $location.path('/admin');
    }
    */
    //$scope.currentAdmin = adminAuthentication.currentAdmin.name;
    //console.log(adminAuthentication.payload);
    console.log("Current admin is : ");
    console.log(adminAuthentication.currentAdmin.email);
    
}
