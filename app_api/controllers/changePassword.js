/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

//var passport = require('passport');
//var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
   
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.changePassword = function(req, res){
    //console.log("Change Password details received from browser is : " + req.body.pwd.oldPassword);
    //console.log("Current user received from Browser is : " + req.body.userEmail);
    var oldPassword = req.body.pwd.oldPassword;
    var newPassword = req.body.pwd.newPassword;
    var confirmPassword = req.body.pwd.confirmPassword;
    var userEmail = req.body.userEmail;
    
    if(newPassword === confirmPassword){
       User.findOne({email: userEmail})
            .exec(function(err, user){
                //console.log("User found");  
                if(!user){
                    sendJSONresponse(res, 404, {message: "Sorry you can not change password at this moment"});
                }
                else if(user.validPassword(oldPassword)){
                     //console.log("user.validPassword(oldPassword)");
                    //console.log("Password is validated");
                    user.setPassword(newPassword);
                    user.save(function(err){
                        //console.log("Password Changed  inside save function database also changed");
                        var token;
                        if (err){
                            sendJSONresponse(res, 404, err);
                        }
                        else{
                            token = user.generateJwt();
                            sendJSONresponse(res, 200, {"token": token});
                        }
                    });
                    //console.log("Password Changed");
                }
                else{
                    //If loggedIn user enters wrong old password. Message is generated in the client side.
                    sendJSONresponse(res, 404, {});
                };
            }); 
    }
    else{
        sendJSONresponse(res, 404, {message: "Both Password should be same"});
    }
    
    
};