/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

  angular
    .module('roomApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: "directives/navigation/navigationView.html",
      controller: 'navigationCtrl'
    };
  }

