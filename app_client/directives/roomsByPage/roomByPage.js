/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

  angular
    .module('roomApp')
    .directive('roomByPage', roomByPage);

  function roomByPage () {
    return {
      restrict: 'EA',
      templateUrl: "directives/roomsByPage/roomByPage.html",
      controller: 'roomByPageCtrl'
    };
  }