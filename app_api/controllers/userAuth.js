/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.validateEmail = function(req, res){
    var emailToValidate = req.body.email;
    //console.log("Email received to validate is : " + emailToValidate);
    User.findOne({email: emailToValidate})
            .exec(function(err, user){
            if(user){
                //console.log("User already exists");
                res.json("This email is already used, Please use different Email");
                //sendJSONresponse(res, 301, {message: "This email address is already registered. Please try different email address"});
            }
    });
};

// This handles the user registration request from the browser on /api/register url
module.exports.register = function(req, res){
    //console.log(req.body.firstName);
    //console.log(req.body);
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {message : "All field required !"});
        //console.log("All fields required");
        return;
    }
    else if(req.body.firstName.length<2 || req.body.lastName.length <2){
        sendJSONresponse(res, 400, {message: "Must be atleast 2 character long"});
        return;
    }
    else if(req.body.firstName.length>15 || req.body.lastName.length >15){
        sendJSONresponse(res, 400, {message: "Must not be more than 2 character long"});
        return;
    }
    else if(req.body.password !== req.body.password1){
        sendJSONresponse(res, 400, {message: "Both Password should be the same"});
        return;
    }
        //console.log("I am fine sofar");
        // creates a new user on user collection
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save(function(err){
            var token;
            if (err){
                sendJSONresponse(res, 404, {message: "This email address is already registered"});
                //console.log("Can not save the user now");
            }
            else{
                token = user.generateJwt();
                sendJSONresponse(res, 200, {"token": token});
            }
        }); 
};

module.exports.login = function(req, res) {
    //console.log("Login function working");
    passport.use(new localStrategy({
    usernameField: 'email'
    }, function(username, password, done) {
        //console.log("Username received" + username);
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email address.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));
    
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {"message": "All fields required"});
        return;
    }
  //console.log("email and password is suplied");

    passport.authenticate('local', function(err, user, info){
        //console.log("passport authenticate is working");
        //console.log("user is : " + user);
        var token;

        if (err) {
            sendJSONresponse(res, 404, err);
            //console.log("Error occured");
            return;
        }
        //console.log("No error genereated");
        if(user){
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
  })(req, res);

};

