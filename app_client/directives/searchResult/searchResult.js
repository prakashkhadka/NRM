/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

angular
    .module('roomApp')
    .directive('searchResult', searchResult);

  function searchResult () {
    return {
      restrict: 'EA',
      templateUrl: "directives/searchResult/searchResultView.html"
    };
  }

