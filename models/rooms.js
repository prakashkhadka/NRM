/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');
var roomImageNameSchema = new mongoose.Schema({
    imageName: {type: "String"}
});
// Defines room schema and its field
var roomSchema = new mongoose.Schema({
    suburb: {type:"String", required: true},
    postcode:{type:"Number", required: true},
    state:{type:"String", required: true},
    street: {type:"String", required: true},
    street_no: {type:"Number", required: true},
    unit: "Number",
    rent:{type:"Number", required: true},
    frequency:{type:"String"},
    bond: "Number",
    required_no: "Number",
    gender: "String",
    available_from: "String",
    message: "String",
    contact_no:{type:"Number", required: true},
    email: {type:"String", required: true},
    createdOn: {type: Date, default: new Date(), expires: 60*60*24*30},
    images: [String]
});
// Instantiate Room Model from roomSchema
// After this Room is used to represent roomSchema
// user input goes through this schema(like filter) to database(room collection)
mongoose.model("Room", roomSchema);