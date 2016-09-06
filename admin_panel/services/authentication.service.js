

  angular
    .module('adminApp')
    .service('authentication', authentication);

  
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['admin-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['admin-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

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
        console.log("Registration detail is sent to server : " + user.adminName);
      return $http.post('/adminApi/adminRegister', user).success(function(data){
          //console.log("Registration completed. Data returned from register service is : " + data);
        saveToken(data.token);
      });
    };

    login = function(user) {
        //console.log("Data sent tos server for login is : " + user.adminName, user.email, user.password);
      return $http.post('/adminApi/adminLogin', user).success(function(data) {
          console.log("User is logged in successfully" + data);
        saveToken(data.token);
        
      });
    };

    logout = function() {
      $window.localStorage.removeItem('admin-token');
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


