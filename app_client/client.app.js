/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    //This is the entry point of roomApp
    angular.module("roomApp", ['ngRoute', 'ngAutocomplete', 'ngFileUpload']);
    //angular.module("roomApp", ['ngRoute', 'ngAutocomplete', 'ngFileUpload', 'ui.bootstrap']);

    angular.module("roomApp")
            //.controller('indexController', indexController);
            .controller('indexController', ['$anchorScroll', indexController]);
    
    //indexController.$inject = ['$anchorScroll'];
    function indexController($anchorScroll){
        $anchorScroll();
    };
})();