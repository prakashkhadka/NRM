/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */

var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty : 'payload'
});

var ctrlRoom = require('../controllers/room');
var ctrlUser = require('../controllers/userAuth');
var ctrlPassword = require('../controllers/password');
var ctrlChangePassword = require('../controllers/changePassword.js');
var ctrlRoomSearch = require('../controllers/roomSearch.js');
var ctrlAmazonUrl = require('../controllers/amazonUrl.js');
var ctrlContactUs = require('../controllers/contactUs.js');

router.post('/roomSearch', ctrlRoomSearch.roomSearch);

router.post('/validateEmail', ctrlUser.validateEmail);

router.post('/forgottonPassword', ctrlPassword.forgottonPasswordReset);
router.get('/forgottonPasswordReset/:token', ctrlPassword.resetFgtPassword);

router.post('/doReset', ctrlPassword.doReset);

router.post('/changePassword', auth, ctrlChangePassword.changePassword);

router.post('/login', ctrlUser.login);
router.post('/register', ctrlUser.register);
router.get('/myRoom/:userEmail', auth, ctrlRoom.getMyRoom);

router.get('/rooms', ctrlRoom.roomList);
router.get('/roomsByPage/:value', ctrlRoom.roomListPage);

router.post('/amazonUrl', auth, ctrlAmazonUrl.getAmazonUrl);

router.get('/rooms/:roomid', ctrlRoom.roomReadOne);
router.put('/rooms/:roomid', auth, ctrlRoom.updateOneRoom);
router.delete('/rooms/:roomid', auth, ctrlRoom.deleteOneRoom);
router.post('/rooms', auth, ctrlRoom.createOneRoom);

router.post('/contactUs', ctrlContactUs.contactUs);
/*
router.post('/contactUs', function(req, res){
    console.log("contactUs api called : " + req.body);
});
*/
module.exports = router;