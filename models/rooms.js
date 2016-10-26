/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    var mongoose = require('mongoose');

    var emailToOwnerSchema = new mongoose.Schema({
        emailSenderName: "String",
        emailSenderPhone : "Number",
        emailSenderEmail: "String",
        emailSenderMessage: "String"
    });
    /*
    var roomImageNameSchema = new mongoose.Schema({
        imageName: {type: "String"}
    });
    */
    // Defines room schema and its field
    var roomSchema = new mongoose.Schema({
        allowedToPublic: {type: "Boolean", required: true},
        removed:{type:"Boolean"},
        removedOn: {type: Date},
        suburb: {type:"String", required: true},
        postcode:{type:"Number", required: true},
        state:{type:"String", required: true},
        street_name: {type:"String"},
        street_no: {type:"Number"},
        unit: "Number",
        rent:{type:"Number", required: true},
        //frequency:{type:"String"},
        bond: "Number",
        //required_no: "Number",
        bills: "String",
        furnishing: "String",
        parking: "String",
        propertyType: "String",
        totalBedRooms: "Number",
        totalBathrooms: "Number",
        gender: "String",
        available_from: "Date",
        message: "String",
        contact_no:{type:"Number", required: true},
        email: {type:"String", required: true},
        createdOn: {type: Date, default: new Date(), expires: 60*60*24*30},
        images: [String],
        emailToOwner: [emailToOwnerSchema]
    });
    // Instantiate Room Model from roomSchema
    // After this Room is used to represent roomSchema
    // user input goes through this schema(like filter) to database(room collection)
    mongoose.model("Room", roomSchema);
})();