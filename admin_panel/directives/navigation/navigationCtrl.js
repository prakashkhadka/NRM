(function(){

  angular
    .module('adminApp')
    .controller('navigationCtrl', ['$scope', '$location', 'adminAuthentication', navigationCtrl]);

  //navigationCtrl.$inject = ['$scope', '$location', 'adminAuthentication'];
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
})();
