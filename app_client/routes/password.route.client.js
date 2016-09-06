/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

// Client side routes
angular.module("roomApp")
        .config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider       
            .when("/forgetPassword",{
                templateUrl: "auth/forgetPassword/forgetPassword/forgetPasswordTemplate.html",
                controller: "forgetPasswordCtrl"
                
    })
            .when("/resetForgottonPassword/:receivedToken",{
                templateUrl: "auth/forgetPassword/resetForgottonPassword/resetForgottonPwdTemplate.html",
                controller: "resetForgottonPwdCtrl"
                
    })
            .when("/fgtPwdResetFeedback",{
                templateUrl: "auth/forgetPassword/pwdResetReqAcknowledgement/fgtFeedback.html",
                controller: "fgtFeedbackCtrl"
                
    })
            .when("/successFgtPwdResetFeedback",{
                templateUrl: "auth/forgetPassword//successFgtPwdResetFeedback/successFgtPwdResetFeedbackTemplate.html",
                controller: "successFgtPwdResetFeedbackCtrl"
                
    })
            .when("/changePassword",{
                templateUrl: "auth/changePassword/changePassword/changePasswordTemplate.html",
                controller: "changePasswordCtrl"
                
    })
            .when("/changePasswordFeedback",{
                templateUrl: "auth/changePassword/changePasswordFeedback/changePasswordFeedbackTemplate.html",
                controller: "changePasswordFeedbackCtrl"
                
    });
};
