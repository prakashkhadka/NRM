/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var mongoose = require('mongoose');
var Rm = mongoose.model('Room');

module.exports.roomSearch = function(req, res){
    //console.log("Room Search request is : " + req.body.suburb);
    var postcode = req.body.postCode;
    //console.log("Postcode : " + postcode);
    var suburb = req.body.suburb;
    //console.log("Suburb : " + suburb);
    var state = req.body.state;
    //console.log("State : " + state);
    if(postcode){
        var searchValue = postcode;
    }
    else if(suburb){
        searchValue = suburb;
    }
    else if(state){
        searchValue = state;
    }
    //console.log("SearchValue is : " + searchValue);
    
    //Rm.find({$or: [{postcode: searchValue}, {suburb: searchValue},{suburb: searchValue}]})
    if(postcode){
        Rm.find({postcode: searchValue})
        .select('suburb postcode street street_no unit rent')
        .exec(function(err, results){   // executes the function inside braces
            //console.log("Search result on the server : " + results);
            var rooms = [];
            for(var i=0; i < results.length; i++){
                rooms.push(results[i]);
            };
            //console.log("Search result on the server : " + rooms);
            res.json(rooms);
            return;
        });
    }
    else if(suburb){
        Rm.find({suburb: searchValue})
        .select('suburb postcode street street_no unit rent')
        .exec(function(err, results){   // executes the function inside braces
            var rooms = [];
            for(var i=0; i < results.length; i++){
                rooms.push(results[i]);
            };
            //console.log("Search result on the server : " + rooms);
            res.json(rooms);
            return;
        });
    }
    else if(state){
        Rm.find({state: searchValue})
        .select('suburb postcode street street_no unit rent')
        .exec(function(err, results){   // executes the function inside braces
            var rooms = [];
            for(var i=0; i < results.length; i++){
                rooms.push(results[i]);
            };
            //console.log("Search result on the server : " + rooms);
            res.json(rooms);
            return;
        });
    }
};  
 

