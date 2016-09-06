/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
//var passport = require('passport');
//var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

   
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.forgottonPasswordReset = function(req, res){
    var emailOfPWD = req.body.email;
    //console.log("forgetPassword is here" + emailOfPWD);
    User.findOne({email: emailOfPWD}).exec(function(err, user){
        //console.log("User Found" + user.email);
        if(!user){
            sendJSONresponse(res, 401, {message: "User not found"});
        }
            var token = crypto.randomBytes(20).toString('hex');
            //console.log("Password Reset Token is : " + token);
            
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 1800000; // 1 hour
            
            user.save(function(err){
                //console.log("user is saved");
                if(err){
                    //console.log("User can not be saved and its reset property also not set");
                    sendJSONresponse(res, 404, err);
                    return;
                }
                // If password property is saved It should send an reset link to its email address
               
                var transporter = nodemailer.createTransport({
                    service: 'SendGrid',
                    auth: {
                        user: 'nepaliroommate',
                        pass: 'northsydney2060'
                    }
                }, {
                    // default values for sendMail method
                    from: 'passwordReset@nepaliroommate.com.au',
                    headers: {
                        'My-Awesome-Header': '123'
                    }
                });
                transporter.sendMail({
                    to: user.email,
                    subject: 'Password reset request',
                    //text: 'http://localhost:3000/api/forgottonPasswordReset/'+ token
                    html: 'Hi ' +"<b>" + user.firstName + "</b>" + "<br><br>" + "You have received this email because you or \n\
                            someone requested us for password reset.prototype \n\
                            If you have requested, please copy provided link into your browser and follow the instructions.\n\
                            If you have not requested, just ignore this. Your password will not change. Please click below link or copy \n\
                             and paste into your browser and follow the instructions." + "<br>" + "http://localhost:3000/api/forgottonPasswordReset/" + token + "<br><br>" + "Thank you."
                     });
            });
    });
    
    };
    
module.exports.resetFgtPassword = function(req, res){
    var tokenReceived = req.params.token;
    //console.log("Token Received from user email : " + tokenReceived);
    User.findOne({resetPasswordToken: tokenReceived , resetPasswordExpires: { $gt: Date.now() }}, function(err, user){
        if(!user){
            sendJSONresponse(res, 404, {message: "Someting gone wrong. It looks like your password is already reset"});
            return;
            //res.redirect('/forgot');
        }
        //console.log("User found");
        res.redirect('/resetForgottonPassword/' + tokenReceived);
    });
};

module.exports.doReset = function(req,res){
    //console.log("Received body is : " + req.body.token);
    var token = req.body.token;
    var password1 = req.body.newPassword.newPassword1;
    var password2 = req.body.newPassword.newPassword2;
    //console.log("resetToken received by server is : " + token);
    //console.log("newPassword1 received by server is : " + password1);
    //console.log("newPassword2 received by server is : " + password2);
    if(!token || !password1 || !password2){
        res.sendJSONresponse(res, 404, {message: "You must fill up all the required field i.e. passwords"});
        return;
    }
    else if(password1 !== password2){
        res.sendJSONresponse(res, 404, {message: "Bothpassword should match"});
        res.redirect('/resetForgottonPassword/:token');
    }
    User.findOne({resetPasswordToken : token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
        if(err){
            sendJSONresponse(res, 404, err);
        }
        else{
            user.setPassword(password1);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err){
            var token;
            if (err){
                sendJSONresponse(res, 404, err);
            }
            else{
                token = user.generateJwt();
                sendJSONresponse(res, 200, {"token": token});
            }
        }); 
        }
        //console.log("Password reset completed");
    });
};