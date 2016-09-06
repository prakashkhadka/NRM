/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

//Defines user schema
var userSchema = new mongoose.Schema({
    firstName: {type : String, required : true},
    lastName:{type : String, required : true},
    email: {type : String, required : true, unique: true},
    memberSince: {type: Date, default: Date.now},
    hash: String,
    salt: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() +1);        // this jwt is expired in 1 day
    return jwt.sign({                           // sign method of jwt npm is used to generate web token with the secret provided by server
        _id : this._id,
        email : this.email,
        firstName : this.firstName,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET
            );
};
// Instantiated User model from userSchema
mongoose.model("User", userSchema);

/*
 After seetting up the envirobment variable 
to load to the heroku we need to issue the following command 

$ heroku config:set JWT_SECRET=secret value (real secret value is not here)
 */