'use strict';

var CHAR_RANGE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
exports.generateToken = function() {
    var token = "";
    for (var i = 0; i < 7; i++) {
        var rand = Math.floor(Math.random() * CHAR_RANGE.length);
        token += CHAR_RANGE.substring(rand, rand +1);
    }
    return token;
};


exports.getTokenKey = function(aid) {
    return 'ns:token:' + aid;
};


exports.update = function(aid, token) {
    var tokenKey = exports.getTokenKey(aid);
    var redis = require('redis').createClient();
    redis.set(tokenKey, token);
    console.log('update Token',token);
    return token;
};


exports.getToken = function(aid, callback) {
    console.log('Token js aid ',aid);
    var token = '';
    var tokenKey = exports.getTokenKey(aid);
    var redis = require('redis').createClient();
    redis.get(tokenKey, function(err, reply) {
        console.log('redis get Token ', reply);
        callback(reply);
    });
};





