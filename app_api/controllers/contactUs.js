/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');
var contactModel = mongoose.model('contactUs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.contactUs = function(req, res){
    console.log("ContactUs is OK : ");
    console.log(req.body);
    contactModel.create({                                 // creates a new room on room collection
        guestName : req.body.name,
        email : req.body.email,
        message: req.body.message
    }, 
    function (err, contactMsg){
        if(err){
            //console.log(err);
            sendJSONresponse(res, 400, err);    // if can not created room. This specially occures when the supplied 
                                                //data does not match with mongose schema. May be some required field missing
        }
        else{
            //console.log(room);
            //console.log("Data sent to database is : " + room);
            sendJSONresponse(res, 201, "Success");
        }
    }
    );
};