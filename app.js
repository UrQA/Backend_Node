'use strict';
var gk = require('./common');
var fs = require('fs');

process.env.TZ = 'Asia/Seoul';

// express
var express = require('express');
var errorHandler = require('./middleware/error');
var checkerMidleware = require('./middleware/checker');

// app
var app = express();
app.configure(function() {
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.compress());
    app.use(errorHandler());
    app.use(checkerMidleware());
});
// Database must be initialized.
var database = require('./database');
database.init(gk.store.database);

// router
var router = require('./routes');
router.route(app);

/////////////////////////////////////////////////////////////////
// HTTP & HTTPS support
var http = require('http');
// Create an HTTP service.
http.createServer(app).listen(gk.config.port);
console.log("Server started at port (http) " + gk.config.port);

var https = require('https');
var https_options = {
  key: fs.readFileSync(__dirname + '/config/https/server.key'),
  cert: fs.readFileSync(__dirname + '/config/https/server.crt')
};
// Create an HTTPS service identical to the HTTP service.
https.createServer(https_options, app).listen(gk.config.httpsport);
console.log("Server started at port (https) " + gk.config.httpsport);
