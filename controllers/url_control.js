/**
 * Created by duhyeong1.kim on 2014-08-20.
 */
'use strict';
var common = require('../common');
var async = require('async');
var sprintf = require("sprintf").sprintf;

var rabbitmq = require('./mqhandler/rabbitmq');
var mqueue = new rabbitmq({"mq":common.config.mq});
var queueName = config.mqQueueName;


var get_cur_time = function() {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    //global.gc(true);
    return curtime;
};

exports.connect = function(req, res) {
    //console.log("connect Data:" ,  req.body);
    var data = { 'tag':'connect','data': req.body,'date_time': get_cur_time()};    
    async.series([
        function (cb) {
            //var ret = mq_pubhandler.publish(queueName, data);
            mqueue.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success' };
        res.send(result);
    });
}


exports.receive_exception = function(req, res) {
    //console.log("exception Data:" ,  req.body);
    var _id = req.body.instance;
    var version = req.body.version;
    var _data  = {};

    if ( version ){
        _data.tag = 'receive_exception'
        _data.data = req.body.exception;
        _data.log = req.body.console_log.data;
        _data.date_time = get_cur_time();
    }
    else{
        _data.tag = 'receive_exception'
        _data.data = req.body;
        _data.date_time = get_cur_time();
    }



    async.series([
        function (cb) {
            //mq_pubhandler.publish(queueName, _data);
            mqueue.publish(queueName, _data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
    });
}

exports.receive_native = function(req, res) {

    var data = { 'tag':'receive_native', 'data': req.body.exception ,'log':req.body.console_log.data,'dump_data':req.body.dump_data, 'date_time':get_cur_time()};
    console.log("native dump data");

    async.series([
        function (cb) {
            mqueue.publish(queueName, data);
            //mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
    });
};

exports.receive_test_data = function(req, res) {

    var data = { 'tag':'receive_native_dump','data': req.body.img, 'date_time':get_cur_time()};
    async.series([
        function (cb) {
            mqueue.publish(queueName, data);
            //mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
    });

};



exports.url_redirect = function(req,res) {
    // res.redirect('http://ur-qa.com:9000');
    async.series([
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

