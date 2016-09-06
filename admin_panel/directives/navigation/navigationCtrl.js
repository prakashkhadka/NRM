

  angular
    .module('adminApp')
    .controller('navigationCtrl', navigationCtrl);

  
  function navigationCtrl($scope, $location, authentication) {
    //console.log("navigationCtrl is envoked");

    $scope.currentPath = $location.path();

    $scope.isLoggedIn = authentication.isLoggedIn();

    $scope.currentUser = authentication.currentUser();

    $scope.logout = function() {
      authentication.logout();
      $scope.isLoggedIn = false;
      $location.path('/admin');
      
    };

  }
