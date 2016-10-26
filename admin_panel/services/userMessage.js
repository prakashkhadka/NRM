(function(){
    angular
        .module("adminApp")
        .service("userMessage", ['$http', 'adminAuthentication', userMessage]);
    
    //userMessage.$inject = ['$http'];
    function userMessage($http, adminAuthentication){
        var getMessage = function(){
            return $http.get('/adminApi/getMessage', {
            headers: {Authorization: 'Bearer '+ adminAuthentication.getToken()}});
        };

        return {
            getMessage : getMessage
        };
    }
})();