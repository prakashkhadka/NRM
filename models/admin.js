/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var adminSchema = new mongoose.Schema({
    firstName: {type: String, required : true},
    lastName : {type: String, required : true},
    adminName: {type : String, required : true, unique: true},
    email: {type : String, required : true, unique: true},
    hash: String,
    salt: String
});

adminSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

adminSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

adminSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() +1);
    
    return jwt.sign({
        _id : this._id,
        email : this.email,
        firstName : this.firstName,
        adminName: this.adminName,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.ADMIN_SECRET
            );
};


mongoose.model("Admin", adminSchema);

/*
 After seetting up the envirobment variable 
to load to the heroku we need to issue the following command 

$ heroku config:set JWT_SECRET=thisIsSecret
 */