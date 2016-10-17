/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
var Rm = mongoose.model('Room');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.allowToPublic = function(req, res){
    var roomId = req.params.roomId;
     //console.log("roomID received is : ");
    //console.log(roomId);
    if(!roomId){
        sendJsonResponse(res, 404, {"message" : "Room Id not found"});
        return;
    }
    Rm
        .findById(roomId)
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
            //console.log("RoomID found");
            room.allowedToPublic = true;
            //console.log("The room object to be saved is : " + room);
            room.save(function(err, room){
                if(err){
                    //console.log("Error reported");
                    sendJsonResponse(res, 404, err);
                }
                else{
                    sendJsonResponse(res,200, room);
                }
            });
    });
};
