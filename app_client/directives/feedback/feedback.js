/*
* @Author: Rajesh Basnet
* @Date:   2016-10-05 17:14:32
* @Last Modified by:   Rajesh Basnet
* @Last Modified time: 2016-10-05 18:14:21
*/
(function(){
    'use strict';
    angular
        .module('roomApp')
        .directive('feedback', feedback);
    
    function feedback(){
        return {
            restrict: 'EA',
            replace:true,
            templateUrl:'directives/feedback/feedbackTemplate.html',
            scope:{
                isActionCompleted: '@',
                feedbackMessage:'@'
            }  
        };
    }
})();