/**
 * Created by duhyeong1.kim on 2014-08-20.
 */
'use strict';
var gk = require('../common');
var mq_pubhandler = require('../handler/mq_pubhandler');
var queueName = gk.config.mqQueueName;
var sprintf = require("sprintf").sprintf;

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
    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    return curtime;
};

exports.connect = function(req, res) {
    var data = { 'tag':'connect','data': req.body,'date_time': get_cur_time()};

    //# set queue name for worker and queue
    /*
    var client_type = req.query.client_type;
    var queueName = queueName;
    if(client_type) queueName = client_type;
    */
    gk.async.sequence([  //async.waterfall
        function (cb) {
            var ret = mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
    });
}


exports.receive_exception = function(req, res) {
    //console.log("exception Data 2 ->", req.body.exception);
    //console.log("console log Data->", req.body.console_log);
    var _id = req.body.instance;
    var version = req.body.version;
    var _data  = {};

    //# set queue name for worker and queue
    
    /*
    var client_type = req.query.client_type;
    var queueName = queueName;
    if(client_type) queueName = client_type;
    */

    if ( version ){
        _data.tag = 'receive_exception'
        _data.data = req.body.exception;
        _data.log = req.body.console_log.data;
        _data.date_time = get_cur_time();
        console.log("req body receive_exception--->>>> ", _data);
    }
    else{
        _data.tag = 'receive_exception'
        _data.data = req.body;
        _data.date_time = get_cur_time();
        console.log("req body log_data", _data);
    }

    gk.async.sequence([
        function (cb) {
            console.log("--->>>>>", _data);
            mq_pubhandler.publish(queueName, _data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
        // console.log("return receive exception ->", result);
    });
}

exports.receive_native = function(req, res) {

    var data = { 'tag':'receive_native', 'data': req.body.exception ,'log':req.body.console_log.data,'dump_data':req.body.dump_data, 'date_time':get_cur_time()};

    //# set queue name for worker and queue
    /*
    var client_type = req.query.client_type;
    var queueName = queueName;
    if(client_type) queueName = client_type;
    */

    console.log("native data ----------->" + data.data.locale);
    //console.log("native log ----------->" + data.log);
    //console.log("native dump data ----------->" + data.dump_data);
    console.log("native time ----------->" + data.date_time);

    gk.async.sequence([
        function (cb) {
            mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
    });
};

exports.receive_test_data = function(req, res) {

    var data = { 'tag':'receive_native_dump','data': req.body.img, 'date_time':get_cur_time()};
    console.log(data.date_time);
    console.log(req.body.img)

    //# set queue name for worker and queue
    /*
    var client_type = req.query.client_type;
    var queueName = queueName;
    if(client_type) queueName = client_type;
    */
    gk.async.sequence([
        function (cb) {
            mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
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


