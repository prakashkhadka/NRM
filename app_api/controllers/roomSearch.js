/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function(){
    var mongoose = require('mongoose');
    var Rm = mongoose.model('Room');

    module.exports.roomSearch = function(req, res){
        //console.log("Room Search request is : " );
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
            .select('suburb postcode street_name street_no unit rent images gender state available_from')
            .where('allowedToPublic').equals('true')
            .where('removed').equals('false')
            .exec(function(err, results){   // executes the function inside braces
                //console.log("Search result on the server : " + results);
                if(err){
                    return;
                }
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
            //console.log("Suburb found");
            Rm.find({suburb: searchValue})
            .select('suburb postcode street_name street_no unit rent images gender state available_from')
            .where('allowedToPublic').equals('true')
            .where('removed').equals('false')
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
            .select('suburb postcode street_name street_no unit rent images gender state available_from')
            .where('allowedToPublic').equals('true')
            .where('removed').equals('false')
            .exec(function(err, results){   // executes the function inside braces
                if(err){
                    return;
                }
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
})();
