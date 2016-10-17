

  angular
    .module('adminApp')
    .controller('navigationCtrl', navigationCtrl);

  
  function navigationCtrl($scope, $location, adminAuthentication) {
    //console.log("navigationCtrl is envoked");

    $scope.currentPath = $location.path();

    $scope.isLoggedIn = adminAuthentication.isLoggedIn();

    $scope.currentAdmin = adminAuthentication.currentAdmin();

    $scope.logout = function() {
      adminAuthentication.adminLogout();
      $scope.isLoggedIn = false;
      $location.path('/admin');
      
    };

  }
