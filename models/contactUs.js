/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');


var contactSchema = new mongoose.Schema({
    guestName: {type: String, required : true},
    email: {type : String, required : true},
    message: {type: String, required: true}
});

mongoose.model("contactUs", contactSchema);