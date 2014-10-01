'use strict';
var gk = require('../common');
var async  = require('async');
var mq_pubhandler = require('../handler/mq_pubhandler');
var queueName = gk.config.mqQueueName;
var CHAR_RANGE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
var sprintf = require("sprintf").sprintf;
var BSON = require('buffalo')
var fs = require('fs');

var get_cur_time = function() {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    //# step 1 : make data
    //# step 1 - 0 : make elementary data
    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec)

    return curtime;
};

exports.generateSession = function() {
    var id_session = "";
    for (var i = 0; i < 9; i++) {
        var rand = Math.floor(Math.random() * CHAR_RANGE.length);
        id_session += CHAR_RANGE.substring(rand, rand +1);
    }
    return id_session;
};

exports.connect = function(req, res) {

    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();

    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    //console.log("curtime", curtime);

    var data = { 'tag':'connect', 'instance_id':"", 'data': req.body,'date_time': curtime};
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

    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();

    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    //console.log("curtime", curtime);

    var _id = req.body.instance;
    var version = req.body.version;
    var _data  = {};

    if ( version ){
        _data.tag = 'receive_exception'
        _data.data = req.body.exception;
        _data.log = req.body.console_log.data;
        _data.date_time = curtime;
        console.log("req body receive_exception--->>>> ", _data);
    }
    else{
        _data.tag = 'receive_exception'
        _data.data = req.body;
        _data.date_time = curtime;
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

exports.receive_native_dump = function(req, res) {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    //# step 1 : make data
    //# step 1 - 0 : make elementary data
    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    var dumpId = req.query.dumpId;
    //var buffer = BSON.serialize(req.body)
    //# step 1 - 1 make binary
    var binaryData= ''
    req.setEncoding('binary')

    req.on('data', function(chunk){
        binaryData += chunk
    });

    req.on('end', function(){
        console.log('File saved.');
        //# step 1 -2 : this is process to input binaryData into json
        //var encodedData = BSON.serialize(binaryData);
        var encodedData = binaryData;

        var data = {'tag':'receive_native_dump','data':encodedData,'date_time':curtime};
        console.log("data ------------->"+data.data);
        console.log("data type -------->" + typeof(data.data));
        //# step 2 : send data to rabbit mq
        gk.async.sequence([
            function (cb) {
                console.log("before pub");
                mq_pubhandler.publish(queueName, data);
                cb();
                console.log("receive_native_dump");
            }
        ], function (err) {
            res.send("success");
        });

    });
};

exports.receive_native = function(req, res) {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();

    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);

    var data = { 'tag':'receive_native', 'instance_id':"", 'data': req.body ,'date_time':curtime};
    var result = {};

    gk.async.sequence([
        function (cb) {
            console.log("babooooooooooooooooooo");
            mq_pubhandler.publish(queueName, data);
            console.log("hellp");
	    cb();
        }
    ], function (err) {
        result = { 'state': 'success'};
        res.send(result);
    });

};


exports.receive_test_data = function(req, res) {
    /*
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();

    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    */

    var data = { 'tag':'receive_native_dump', 'instance_id':"", 'data': req.body.img, 'date_time':get_cur_time()};
    var result = {};

    gk.async.sequence([
        function (cb) {
            mq_pubhandler.publish(queueName, data);
            console.log("hello");
	    //cb();
        }()
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
                    Location: 'http://urqa.io'
                });
            res.end();
        }
    ], function (err) {
        res.send(result);
    });
};




