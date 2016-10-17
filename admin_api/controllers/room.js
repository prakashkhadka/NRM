var mongoose = require('mongoose');
var Rm = mongoose.model('Room');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//roomList Controller of app_api routes index.js
module.exports.roomList = function(req, res){
    Rm.find()
            .select('suburb postcode street_name street_no unit rent')
            .where('allowedToPublic').equals('false')
            .exec(function(err, results){
        var rooms = [];
        for(var i=0; i<results.length; i++){
            rooms.push(results[i]);
        }
        sendJsonResponse(res, 200, rooms);
    });
    
};

//Controller for getting all the information about a specific status from rooms/:roomid path from app_api/routes/index.js
module.exports.readOneRoom = function(req, res){
    //console.log(req.params);
  if (req.params && req.params.roomid) {
    Rm
      .findById(req.params.roomid)
      .exec(function(err, room) {
        if (!room) {
          sendJsonResponse(res, 404, {
            "message": "roomid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, room);
        
      });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No roomid in request"
    });
  }
};

//Controller for adding a room as directed by app_api/routes/index.js
module.exports.createOneRoom = function(req, res){
    console.log("User email is : " + req.payload.email);
    var userEmail = req.payload.email;
    //console.log(req.body);
    Rm.create({
        suburb : req.body.suburb,
        postcode : req.body.postcode,
        street: req.body.street_name,
        street_no : req.body.street_no,
        unit : req.body.unit,
        rent: req.body.rent,
        bond: req.body.bond,
        gender : req.body.gender,
        available_from : req.body.available_from,
        message : req.body.message,
        contact_no : req.body.contact_no,
        email: userEmail
    }, 
    function (err, room){
        if(err){
            //console.log(err);
            sendJsonResponse(res, 400, err);
        }
        else{
            //console.log("Data sent to database is : " + room);
            sendJsonResponse(res, 201, room);
        }
    }
    );
};

//Controller for updating one room as specied by the route rooms/:roomid in app_api/routes/index.js
// this request comes from editRoom Controller ofapp_client/editRoom/editRoom.js

module.exports.updateOneRoom = function(req, res){
    console.log("Requested room id to be edited on api : " + req.params.roomid);
    if(!req.params.roomid){
        console.log("Room id is not found");
        sendJsonResponse(res, 404, {"message" : "Requested roomid is not found, roomid is required"});
        return;
    }
    Rm
        .findById(req.params.roomid)
        .exec(function(err, room){ 
            //console.log("Room object returned from database to be edited : " + room);
            if(!room){
                sendJsonResponse(res, 404, {"message" : "roomid not found"});
                return;
            }
            else if(err){
                //this error is shown on console.log if no room is found
                //console.log("Database couldn't find the the requested room");
                sendJsonResponse(res, 404, err);
                return;
            }
            room.suburb = req.body.suburb;
            //console.log("Changed Suburb is : " + room.suburb);
            room.postcode = req.body.postcode;
            room.street = req.body.street;
            room.street_no = req.body.street_no;
            room.unit = req.body.unit;
            room.rent = req.body.rent;
            room.bond = req.body.bond;
            room.gender = req.body.gender;
            room.available_from = req.body.available_from;
            room.message = req.body.message;
            room.contact_no = req.body.contact_no;
            //console.log("The room object to be saved is : " + room);
            room.save(function(err, room){
                if(err){
                    console.log("Error reported");
                sendJsonResponse(res, 404, err);
            }
            else{
                sendJsonResponse(res,200, room);
            }
            });
    });
    };
    //sendJsonResponse(res, 200, {"status" : "success"});




//Controller for deleting one room as specified by the route rooms/:roomid in app_api/routs/index.js
module.exports.deleteOneRoom = function(req, res){
    var rmid = req.params.roomid;
    //console.log("To be deleted room id is : " + rmid);
    if(rmid){
        Rm
                .findByIdAndRemove(rmid)
                .exec(function(err, deletedRoom){
                    if(err){
                        //console.log("Can not Delete the room. The function findByIdAndRemove is not working : " + err);
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    else{
                        //console.log("Deleted room object is : " + deletedRoom);
                        sendJsonResponse(res, 204, null);
                    }
        });
    }
    else{
        sendJsonResponse(res, 404, {"message" : "Room id is not found"});
    }
    
    
    // Below is an alternative method of removing one room
    /*
    Rm.findOneAndRemove({_id : rmid}, function(err, deletedRoom){
        sendJsonResponse(res, 204, null);
        //console.log("Deleted room Detail is : " + deletedRoom);
        
    });
    
     */           
            
};

module.exports.getMyRoom = function(req, res){
    console.log("Email id to search is received : " + req.params.userEmail);
    Rm
            .find({email: req.params.userEmail})
            .exec(function(err, rooms){
                if(err){
                    console.log("Couldn't find rooms : " + err);
                }
                else{
                    console.log("Found rooms by email are : " + rooms);
                    sendJsonResponse(res, 200, rooms);
                }
    });
};



