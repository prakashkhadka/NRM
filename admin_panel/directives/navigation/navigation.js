
(function(){
    angular
      .module('adminApp')
      .directive('navigation', navigation);

    function navigation () {
      return {
        restrict: 'EA',
        templateUrl: "admin/directives/navigation/navigationView.html",
        controller: 'navigationCtrl'
      };
    }
})();
