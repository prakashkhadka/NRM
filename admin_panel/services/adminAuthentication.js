
angular
    .module('adminApp')
    .service('adminAuthentication', adminAuthentication);

function adminAuthentication ($http, $window) {
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

  var currentAdmin = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return {
        email : payload.email,
        name : payload.firstName,
        adminName : payload.adminName
      };
    }
  };

  adminRegister = function(admin) {
      console.log("Registration detail is sent to server : " + admin.adminName);
    return $http.post('/adminApi/adminRegister', admin).success(function(data){
        //console.log("Registration completed. Data returned from register service is : " + data);
      saveToken(data.token);
    });
  };

  adminLogin = function(admin) {
      //console.log("Data sent tos server for login is : " + user.adminName, user.email, user.password);
      return $http({
          url: '/adminApi/adminLogin',
          method: 'POST',
          data: admin
      }).then(function(response){
          //console.log("User is logged in successfully");
          //console.log(response.data);
          saveToken(response.data.token);
      }, function(response){
          //console.log("Error" + response.data);
      });
      /*
    return $http.post('/adminApi/adminLogin', admin).success(function(data) {
        console.log("User is logged in successfully" + data);
      saveToken(data.token);

    });
    */
  };

  adminLogout = function() {
    $window.localStorage.removeItem('admin-token');
  };

  return {
    currentAdmin : currentAdmin   ,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    adminRegister : adminRegister,
    adminLogin : adminLogin,
    adminLogout : adminLogout
  };
}


