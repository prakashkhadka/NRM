var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

var authAdmin = jwt({
    secret: process.env.ADMIN_SECRET,
    userProperty : 'payload'
});


var ctrlAdmin = require('../controllers/admin');
var ctrlRoom = require('../controllers/room');
var ctrlAllowToPublic = require('../controllers/allowToPublic');
var ctrlGetMessage = require('../controllers/getMessage');

router.post('/adminLogin', ctrlAdmin.adminLogin);
/*
router.post('/adminLogin', function(req, res){
    console.log("Login credential received : " + req.body.email, req.body.password);
});
*/
//router.post('/adminRegister', authAdmin, ctrlAdmin.register);
router.post('/adminRegister', ctrlAdmin.register);
/*
router.post('/adminRegister', function(req, res){
    console.log("Admin Register is called on server route");
    //console.log("req.body.adminName");
});
*/
router.get('/rooms', ctrlRoom.roomList);
router.get('/room/:roomid', ctrlRoom.readOneRoom);
router.get('/allowToPublic/:roomId', ctrlAllowToPublic.allowToPublic);
router.get('/getMessage', ctrlGetMessage.getMessage);

//router.put('/rooms/:roomid', authAdmin, ctrlRoom.updateOneRoom);
//router.delete('/rooms/:roomid', authAdmin, ctrlRoom.deleteOneRoom);


module.exports = router;