var mongoose = require('mongoose');
var Message = mongoose.model('contactUs');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
//roomList Controller of app_api routes index.js
module.exports.getMessage = function(req, res){
    console.log("Get Message envoked");
    Message.find()
            .sort('-createdOn')
            .exec(function(err, results){
        var message = [];
        for(var i=0; i<results.length; i++){
            message.push(results[i]);
        }
        sendJsonResponse(res, 200, message);
    });
    
};