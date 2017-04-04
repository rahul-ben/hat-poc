var express = require('express');
var http = require('http');
var config = require('./settings/config');
var runner = require('./runner');
var every = require('every-moment');
var app = express();



require('./settings/express').configure(app);
require('./settings/routes').configure(app);

var server = http.createServer(app);
var port = process.env.PORT || config.webServer.port || 3500;
server.listen(port);
console.log('listening a http://localhost:' + port);

exports.module = exports = app;