

  angular
    .module('adminApp')
    .directive('footerGeneric', footerGeneric);

  function footerGeneric () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/footer/footerView.html'
    };
  }

