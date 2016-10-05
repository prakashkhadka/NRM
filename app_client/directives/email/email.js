/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

  angular
    .module('roomApp')
    .directive('emailOwner', emailOwner);

  function emailOwner () {
    return {
      restrict: 'A',
      link:function(scope,elem,attr){
        

   var eb = elem.find('.btn-email-owner');
   var cb = elem.find('.btn-close');
        eb.bind('click',function(e){
                eb.css('display', 'none');
                cb.css('display','block');
        });
        cb.bind('click',function(e){
                cb.css('display', 'none');
                eb.css('display','block');
        });
      }
    };
  }

