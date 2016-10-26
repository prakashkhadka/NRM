/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module('roomApp')
        .controller('navigationCtrl', ['$scope', '$location', 'authentication', navigationCtrl]);
        //.controller('navigationCtrl', navigationCtrl);
    //navigationCtrl.$inject = ['$scope', '$location', 'authentication'];
    function navigationCtrl($scope, $location, authentication) {
        $scope.currentPath = $location.path();
        $scope.isLoggedIn = authentication.isLoggedIn();
        $scope.currentUser = authentication.currentUser();


        $scope.logout = function() {
            authentication.logout();
            $scope.isLoggedIn = false;
            $location.path('/');
        };  
    }
})();