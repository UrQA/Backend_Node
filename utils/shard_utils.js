'use strict';

// @return id
exports.getInstanceid = function(aid) {
  var said = aid.split('.');
  console.log(said[0]);
  console.log(said[1]);
  
  var id = said[1];
  var index;
  if(isNaN(id)){  //숫자가 아니면 true
    index = 1;
  }
  else {
    // 숫자
    if(parseInt(id) < 10000 ){
        index = 2;
    }else {
        index = 3;
    }
  }
  
  var instanceId = "GAME_INFO_" + String(index);
  return instanceId;
}

/*
exports.getInstanceid = function(kakaoId, instanceCount) {
    var userSharedId = kakaoId % instanceCount + 1;
    var instanceId = "GAME_USER_" + userSharedId;
    return sinstanceId;
}
*/

exports.getShardKey = function(id) {
    return 'ns:shard:' + id;
};


exports.setShardKey = function(id) {
    var shardKey = exports.getShardKey(id);
    var redis = require('redis').createClient();
    redis.set(shardKey, id);
    console.log('update ShardKey', id);
    return id;
};


exports.getShardInstanceKey = function(id, callback) {
    console.log('Shard shardKey id',id);
    var key = exports.getShardKey(id);
    var redis = require('redis').createClient();

    redis.get(key, function(err, reply) {
        console.log('redis get shard id  ', reply);
        callback(reply);
    });
};

