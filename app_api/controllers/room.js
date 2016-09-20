/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');
var Rm = mongoose.model('Room');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//roomList Controller of app_api routes index.js
module.exports.roomList = function(req, res){
    //console.log("Params received by roomList function is : " + req.params);
    Rm.find() // find everything on the room collections
        .sort('-createdOn')
        .limit(8)
        .select('suburb postcode street street_no unit rent images') // selects only here mentioned items on room collection
        .exec(function(err, results){   // executes the function inside braces
            var rooms = [];             // creates rooms array
            for(var i=0; i<results.length; i++){
                rooms.push(results[i]);
            }                           // loops through the returned rooms object and push to newly created rooms array
            sendJSONresponse(res, 200, rooms); // handles the response
        });
};

module.exports.roomListPage = function(req, res){
    var skipValue = req.params.value - 1;
    //console.log("Params received by roomList function is : " + req.params.value);
    Rm.find() // find everything on the room collections
        .sort('createdOn')
        .limit(8)
        .skip(8 * skipValue)
        .select('suburb postcode street street_no unit rent images') // selects only here mentioned items on room collection
        .exec(function(err, results){   // executes the function inside braces
            var rooms = [];             // creates rooms array
            for(var i=0; i<results.length; i++){
                rooms.push(results[i]);
            }                           // loops through the returned rooms object and push to newly created rooms array
            sendJSONresponse(res, 200, rooms); // handles the response
        });
};

//Controller for getting all the information about a specific room from rooms/:roomid path from app_api/routes/index.js
// Its purpose is to provide all the available room details when the user clicks on a specific room listing on home page
module.exports.roomReadOne = function(req, res){
    //console.log(req.params);
  if (req.params && req.params.roomid) {        // checks if request parameter and room id on request parameter are available
    Rm
      .findById(req.params.roomid)              // search on room collection based on room id
      .exec(function(err, room) {
        if (!room) {
          sendJSONresponse(res, 404, {          // if room id is not available sends the message
            "message": "roomid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 404, err);      // if server error sends this message
          return;
        }
        sendJSONresponse(res, 200, room);       // sends response to the browser if everything is fine
      });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No roomid in request"         // this is envoked if wrong parameter is included (not room id)
    });
  }
};

//Controller for adding a room on room collection as directed by app_api/routes/index.js
module.exports.createOneRoom = function(req, res){
    //console.log("User email is : " + req.payload.email);
    var userEmail = req.payload.email;          // gets user email from payload. This is only possible when user is logged on
    console.log(req.body);
    console.log(req.body.imgName);
    Rm.create({                                 // creates a new room on room collection
        suburb : req.body.suburb,
        postcode : req.body.postcode,
        state: req.body.state,
        street: req.body.street_name,
        street_no : req.body.street_no,
        unit : req.body.unit,
        rent: req.body.rent,
        bond: req.body.bond,
        gender : req.body.gender,
        available_from : req.body.available_from,
        message : req.body.message,
        contact_no : req.body.contact_no,
        email: userEmail,
        images: req.body.imgName
    }, 
    function (err, room){
        if(err){
            //console.log(err);
            sendJSONresponse(res, 400, err);    // if can not created room. This specially occures when the supplied 
                                                //data does not match with mongose schema. May be some required field missing
        }
        else{
            //console.log(room);
            //console.log("Data sent to database is : " + room);
            sendJSONresponse(res, 201, room);
        }
    }
    );
};

//Controller for updating one room as specied by the route rooms/:roomid in app_api/routes/index.js
// this request comes from editRoom Controller ofapp_client/editRoom/editRoom.js
// only logged on user can edit and update thie posts
module.exports.updateOneRoom = function(req, res){
    //console.log("Requested room id to be edited on api : " + req.params.roomid);
    if(!req.params.roomid){
        //console.log("Room id is not found");
        sendJSONresponse(res, 404, {"message" : "Requested roomid is not found, roomid is required"});
        return;
    }
    Rm
        .findById(req.params.roomid)
        .exec(function(err, room){ 
            //console.log("Room object returned from database to be edited : " + room);
            if(!room){
                sendJSONresponse(res, 404, {"message" : "roomid not found"});
                return;
            }
            else if(err){
                //this error is shown on console.log if no room is found
                //console.log("Database couldn't find the the requested room");
                sendJSONresponse(res, 404, err);
                return;
            }
            // left side room collection value is upated with the user input value
            room.suburb = req.body.suburb;
            //console.log("Changed Suburb is : " + room.suburb);
            room.postcode = req.body.postcode;
            room.street = req.body.street;
            room.street_no = req.body.street_no;
            room.unit = req.body.unit;
            room.rent = req.body.rent;
            room.state = req.body.state;
            room.bond = req.body.bond;
            room.gender = req.body.gender;
            room.available_from = req.body.available_from;
            room.message = req.body.message;
            room.contact_no = req.body.contact_no;
            //console.log("The room object to be saved is : " + room);
            room.save(function(err, room){
                if(err){
                sendJSONresponse(res, 404, err);
                console.log("Error occured to change details");
            }
            else{
                sendJSONresponse(res,200, room);
                console.log("Changed detail saved");
            }
            });
    });
    };
    //sendJsonResponse(res, 200, {"status" : "success"});

//Controller for deleting one room as specified by the route rooms/:roomid in app_api/routs/index.js
module.exports.deleteOneRoom = function(req, res){
    var rmid = req.params.roomid;       // assigns roomid requested to deleted to variable rmid
    //console.log("To be deleted room id is : " + rmid);
    if(rmid){
        Rm
            .findByIdAndRemove(rmid)
            .exec(function(err, deletedRoom){
                if(err){
                    //console.log("Can not Delete the room. The function findByIdAndRemove is not working : " + err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                else{
                    //console.log("Deleted room object is : " + deletedRoom);
                    sendJSONresponse(res, 204, null);
                }
            });
    }
    else{
        sendJSONresponse(res, 404, {"message" : "Room id is not found"});
    }
    // Below is an alternative method of removing one room
    /*
    Rm.findOneAndRemove({_id : rmid}, function(err, deletedRoom){
        sendJsonResponse(res, 204, null);
        //console.log("Deleted room Detail is : " + deletedRoom);
    });
     */                
};
// this provided logged in users their posted room details which they can update or delete
module.exports.getMyRoom = function(req, res){
    //console.log("Email id to search is received : " + req.params.userEmail);
    Rm
        .find({email: req.params.userEmail})        // rooms posted by user are seached based on email id retrieved from payload on browser
        .exec(function(err, rooms){
            if(err){
            //console.log("Couldn't find rooms : " + err);
            }
            else{
            //console.log("Found rooms by email are : " + rooms);
                sendJSONresponse(res, 200, rooms);
            }
        });
};



