angular
        .module("adminApp")
        .service("userMessage", userMessage);

function userMessage($http){
    var getMessage = function(){
        return $http.get('/adminApi/getMessage');
    };
    
    
    return {
        getMessage : getMessage
    };
}
