(function(){
var mongoose = require('mongoose');
var Rm = mongoose.model('Room');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//roomList Controller of app_api routes index.js
module.exports.removedRoomList = function(req, res){
    Rm.find()
            .where('removed').equals('true')
            .select('suburb postcode street_name street_no unit rent removedOn')
            .exec(function(err, results){
        var rooms = [];
        for(var i=0; i<results.length; i++){
            rooms.push(results[i]);
        }
        sendJsonResponse(res, 200, rooms);
    });
    
};

})();


