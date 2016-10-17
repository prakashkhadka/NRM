var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res){
    //console.log(req.body.firstName);
    console.log(req.body);
    if(!req.body.adminName || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {message : "All field required !"});
        console.log("All fields required");
        return;
    }
   
        //console.log("I am fine sofar");
        var admin = new Admin();
        admin.adminName = req.body.adminName;
        admin.firstName = req.body.firstName;
        admin.lastName = req.body.lastName;
        admin.email = req.body.email;
        
        admin.setPassword(req.body.password);

        admin.save(function(err){
            var token;
            if (err){
                sendJSONresponse(res, 404, err);
            }
            else{
                token = admin.generateJwt();
                console.log(token);
                sendJSONresponse(res, 200, {"token": token});
            }
        }); 
};




module.exports.adminLogin = function(req, res) {
    //console.log(req.body);
    //console.log("adminLogin Envoked");
     //console.log("Admin login credential received : " + req.body.password, req.body.email);
    if(!req.body.adminName || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.use(new LocalStrategy({
    usernameField: 'adminName'
    },
    function(username, password, done){
        Admin.findOne({ adminName: username }, function (err, admin) {
          //console.log("Found the admin" + admin);
            if (err){ 
                return done(err); 
            }
            if (!admin) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!admin.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, admin);
            });
        }
  ));
   
    passport.authenticate('local', function(err, admin, info){
        //console.log("Admin value is : " + admin);
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if(admin){
            token = admin.generateJwt();
            //console.log(token);
            sendJSONresponse(res, 200, {
                "token" : token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
      })(req, res);

};