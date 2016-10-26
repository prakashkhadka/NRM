/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    angular
        .module('roomApp')
        //.service('authentication', authentication);
        .service('authentication', ['$http', '$window', authentication]);

    //authentication.$inject = ['$http', '$window'];
    function authentication ($http, $window) {
        var saveToken = function (token) {
            $window.localStorage['room-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['room-token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            //console.log("Token is : ");
            //console.log(token);
            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if(isLoggedIn()){
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email : payload.email,
                    name : payload.firstName
                };
            }
        };

        register = function(user) {
            return $http.post('/api/register', user).success(function(data){
              //console.log("Registration completed. Data returned from register service is : " + data);
                saveToken(data.token);
          });
        };

        login = function(user) {
            return $http.post('/api/login', user).success(function(data) {
                //console.log("User is logged in successfully" + data);
                saveToken(data.token);

          });
            /*
          return $http.post('/api/login', user).success(function(data) {
              //console.log("User is logged in successfully" + data);
            saveToken(data.token);

          });
          */
        };

        logout = function() {
            $window.localStorage.removeItem('room-token');
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }
})();

