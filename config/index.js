'use strict';

var os = require('os');
var hostname = os.hostname();
//console.log("hostname:"+ hostname);

var config = require('./develop.json');

if (hostname == 'A12038') {
  // This config is for lhs    
} else {
  // This config is for develop server
  config = require('./develop.json');
}


module.exports = config;

	
