(function(){
angular.module("adminApp")
        .controller("adminDashboardCtrl", ['$scope', '$location', 'adminAuthentication', adminDashboardCtrl]);

function adminDashboardCtrl($scope, $location, adminAuthentication){
    if(!adminAuthentication.isLoggedIn()){
        $location.path('/admin');
    };
    /*
    if(!$scope.isLoggedIn){
        $location.path('/admin');
        return;
    }
    */
    
    //$scope.currentAdmin = adminAuthentication.currentAdmin.name;
    //console.log(adminAuthentication.payload);
    //console.log("Current admin is : ");
    //console.log(adminAuthentication.currentAdmin.email);
    
}
})();
