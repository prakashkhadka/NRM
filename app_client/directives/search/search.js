/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
    .module('roomApp')
    .directive('searchRoom', searchRoom);

  function searchRoom () {
    return {
      restrict: 'EA',
      templateUrl: "directives/search/searchView.html",
      controller: 'searchCtrl'
    };
  }

