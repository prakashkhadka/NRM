/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    var mongoose = require('mongoose');
    var nodemailer = require('nodemailer');

    var ownerEmailModel = mongoose.model('User');
    var room = mongoose.model('Room');

    var sendJSONresponse = function(res, status, content) {
        res.status(status);
        res.json(content);
    };

    module.exports.emailOwner = function(req, res){
        //console.log("Room id is : " + req.body.roomId);
        //console.log(req.body);
        room
            .findById(req.body.roomId)
            .select('emailToOwner')
            .exec(function(err, room){
                //console.log("result after query executed:");
                //console.log(room);
                if(err){
                    sendJSONresponse(res, 400, err);
                }
                else{
                    //console.log(room.emailToOwner);
                    doSendEmail(req, res, room);
                }

        });
        var doSendEmail = function(req, res, room){
            if(!room){
                sendJsonResponse(res, 404, {
                    "message": "Room Id not found"
                });
            }
            else{
                room.emailToOwner.push({
                    emailSenderName: req.body.emailToOwner.name,
                    emailSenderPhone : req.body.emailToOwner.phone,
                    emailSenderEmail: req.body.emailToOwneremail,
                    emailSenderMessage: req.body.emailToOwner.message
                });
                room.save(function(err, room){
                    var thisEmail;
                    if(err){
                        sendJSONresponse(res, 400, err);
                    }
                    else{
                        thisEmail = room.emailToOwner[room.emailToOwner.length - 1];
                        sendEmailToOwner(thisEmail);
                        sendJSONresponse(res, 200, {"message": "Message sent to owner"});
                        //console.log(thisEmail);
                        //sendJSONresponse(res, 201, thisEmail);
                        //console.log("This email value saved is : ");
                        //console.log(thisEmail);
                    }
                });
            }
        };

        var sendEmailToOwner = function(emailComponent){
            //console.log(emailComponent);
            var emailSenderName, emailSenderPhone, emailSenderMessage, ownerEmailAddress;
            emailSenderName = emailComponent.emailSenderName;
            emailSenderPhone = emailComponent.emailSenderPhone;
            emailSenderMessage = emailComponent.emailSenderMessage;
            ownerEmailAddress = req.body.ownerEmail;
            //console.log("OwnerEmail is : " + ownerEmailAddress);
            var transporter = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: 'nepaliroommate',
                    pass: 'northsydney2060'
                }
            }, {
                // default values for sendMail method
                from: 'RoomInquary@nepaliroommate.com.au',
                headers: {
                    'My-Awesome-Header': '123'
                }
            });
            transporter.sendMail({
                to: ownerEmailAddress,
                subject: 'Inquery about you room',
                //text: 'http://localhost:3000/api/forgottonPasswordReset/'+ token
                html: "<h2>Hi</h2>" + "<strong>" + emailSenderName + "</strong>" + " " +" sent an inquary about your room" + "<br>"
                        +  "</strong>" + "Phone: " + "</strong>" + emailSenderPhone
                    + "<br>" + "</strong>" + "Message: " + "</strong>" + emailSenderMessage + "</br>" + "Please contact hime/her."
                 });
        };
    }; 
})();
