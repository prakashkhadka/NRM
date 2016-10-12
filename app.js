/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
require("dotenv").load();
var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var passport    = require('passport');
                  require('./models/db');
                            
var routesApi = require('./app_api/routes/index');
var admin = require('./admin_api/routes/index');

var app = express();

// following middleware are envoked on every request to the browser
// sets fevion icon on the browser head
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors({origin: 'null'}));

// this loads public and app_client folder to the browser on every request to server
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'app_client')));

// this loads admin panel on the browser
app.use('/admin', express.static(path.join(__dirname, "admin_panel")));

app.use(passport.initialize());

/*
 The order is extremely important here. Specially the index page of admin panel should be loaded before the
index page of app_client because client page has no mount therefore it is loaded on every request to server.
If client index page is loaded when visiting admin page, it will create atob and btoa encoding problem on the
browser resulting authentication problem.
Overall, the purpose is to stop client index file to load when visiting admin page
 */

//loads index page of admin panel on the given path
app.use('/admin', function(req, res){
    res.sendFile(path.join(__dirname, 'admin_panel', 'index.admin.html'));
});
//adminApi request is handled by this middleware
app.use('/adminApi', admin);

//public api request is handled by this middleware
app.use('/api', routesApi);

/*loads index page of app_client on every request to server. It rewrites url on server and loads page with copy 
    paste. For example when the request comes from users email account for forgotton password reset link it
    without this it can  not redirect user to password reset link.
*/

app.use(function(req, res){
    res.sendFile(path.join(__dirname, 'app_client', 'index.client.html'));
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    } 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    //console.log("Development mode");
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});