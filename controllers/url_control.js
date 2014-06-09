'use strict';
var gk = require('../common');
var async  = require('async');

var mq_pubhandler = require('../handler/mq_pubhandler');
var queueName = gk.config.mqQueueName;

var CHAR_RANGE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
exports.generateSession = function() {
    var id_session = "";
    for (var i = 0; i < 9; i++) {
        var rand = Math.floor(Math.random() * CHAR_RANGE.length);
        id_session += CHAR_RANGE.substring(rand, rand +1);
    }
    return id_session;
};

exports.connect = function(req, res) {  
  var data = { 'tag':'connect', 'instance_id':"", 'data': req.body };
  var result = {};
  gk.async.sequence([  //async.waterfall
    function (cb) {
      var ret = mq_pubhandler.publish(queueName, data);
      //console.log("connect mq log", ret)
      
      var id_session = exports.generateSession();
      result = { "idsession": id_session };
      cb();
    }
  ], function (err) {
    res.send(result);
  });

};


exports.receive_exception = function(req, res) { 

  //console.log("exception Data 2 ->", req.body.exception);
  //console.log("console log Data->", req.body.console_log);

  var _id = req.body.instance;
  var version = req.body.version;
  var _data  = {};

  if ( version ){
    _data.tag = 'receive_exception'
    _data.data = req.body.exception;
    _data.log = req.body.console_log.data;
    console.log("req body receive_exception--->>>> ", _data);
  }
  else{
    _data.tag = 'receive_exception'
    _data.data = req.body;
    console.log("req body log_data", _data);
  }

  var result = {};
  gk.async.sequence([
    function (cb) {
      console.log("--->>>>>", _data); 
      mq_pubhandler.publish(queueName, _data);
      cb();
    }
  ], function (err) {
    result = { 'state': 'success'};
    res.send(result);
    // console.log("return receive exception ->", result);
  });
};


exports.receive_native_dump = function(req, idinstance, res) {  
  var data = { 'tag':'receive_native_dump', 'instance_id':instance, 'data': req.body };
  var result = {};
  gk.async.sequence([
    function (cb) {
      mq_pubhandler.publish(queueName, data);
      cb();
    }
  ], function (err) {
    result = { 'state': 'success'};
    res.send(result);
  });

};


exports.receive_native = function(req, res) {  
  var data = { 'tag':'receive_native', 'instance_id':"", 'data': req.body };
  var result = {};
  
  gk.async.sequence([
    function (cb) {
      mq_pubhandler.publish(queueName, data);
      cb();
    }
  ], function (err) {
    result = { 'state': 'success'};
    res.send(result);
  });

};



exports.url_redirect = function(req,res) {
 // res.redirect('http://ur-qa.com:9000');
   gk.async.sequence([
    function (cb) {
      res.writeHead(301,
        { 
          Location: 'http://ur-qa.com:9000/' 
        });
        res.end();    
    }
  ], function (err) {
    res.send(result);
  });
};


/*
exports.receive_eventpath = function(req, res) {  

  var data = { 'tag':'receive_eventpath','instance_id':"", 'data': req.body };  
  var result = {};

  async.waterfall([
    function (cb) {
      mq_pubhandler.publish(queueName, data);
      cb();
    }
  ], function (err) {
    result = { 'state': 'success'};
    res.send(result);
  });

};
*/


/*
exports.receive_exception_log = function(req, idinstance, res) {
  var data = { 'tag':'receive_exception_log', 'instance_id':instance, 'data': req.body }; 
  var result = {};
  
  async.waterfall([  
    function (cb) {
      mq_pubhandler.publish(queueName, data);
      cb();
    }
  ], function (err) {
    result = { 'state': 'success'};
    res.send(result);
  });
};
*/


