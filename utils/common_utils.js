'use strict'

var commonUtils = exports;


commonUtils.createId = function() {
  var _uuid = require('node-uuid');
  var _hash = require('mhash').hash;
  var uuid = _uuid.v4();
  var createId = _hash('crc32b', uuid);
  return createId;
};

commonUtils._parseValue = function(data) {
  Object.keys(data).forEach(function(key) {
    data[key] = JSON.parse(data[key]);
  });
};

commonUtils._castToString = function(data) {
  if (data instanceof Array == true) {
    data.forEach(function(info) {
      Object.keys(info).forEach(function(key) {
        if (info[key] !== true && info[key] !== false) {
          if (typeof info[key] == 'number') {
            info[key] = String(info[key]);
          }
          if (info[key] == null){
            info[key] = "";
          }
        }
      });
    });
  } else {
    Object.keys(data).forEach(function(key) {
      if (data[key] !== true && data[key] !== false) {
        if (typeof data[key] == 'number') {
          data[key] = String(data[key]);
        }
        if (data[key] == null){
          data[key] = "";
        }        
      }
    });
  }
  return data;
};

//@param fields, data
//@param {Object} info(key, value)
commonUtils.parseFields = function(fields, data) {
  var result = {};
  var count = 0;
  for (var i in data) {
    var value = data[i];
    if (value == null) {
      value = "";
    }
    result[fields[i]] = value;
  }
  return result;
};

commonUtils.getRandom = function(min, max) {
  var now = new Date();
  var seed = now.getMilliseconds();
  var numMax = Number(max) + 1;
  var numMin = Number(min);
  var random = Math.floor(Math.random(seed) * Number(numMax - numMin)) + Number(numMin);
  return random;
};

commonUtils.getUnixTimestamp = function() {
  return String(Math.round((new Date()).getTime() / 1000)); 
};

commonUtils.searchLevel = function (levelTable, exp) {
  var SEARCH_ACTION_UP = 0;
  var SEARCH_ACTION_DOWN = 1; 

  var startIndex = 0;
  var stopIndex = levelTable.length - 1;
  var middle = Math.floor((stopIndex + startIndex) / 2);
  var lastAction = SEARCH_ACTION_UP;

  var sameCount = 0;
  var last = -1;
  while (true) {
    // gk.log.info(startIndex + ':' + stopIndex + ':' + middle + ':' + last);
    // gk.log.info(levelTable[middle]);
    if (sameCount > 1) {
      // gk.log.info('sameCount', sameCount);
      // gk.log.info('last == middle');
      if (lastAction == SEARCH_ACTION_UP) {
        last--;
      } else if (lastAction == SEARCH_ACTION_DOWN) {
        last++;
      }
      break;
    }
    if (last == middle) {
      sameCount++;
    } else {
      last = middle;
    }

    // adjust search area
    if (exp < levelTable[middle]) {
      // gk.log.info('up');
      stopIndex = middle - 1;
      lastAction = SEARCH_ACTION_DOWN;
    } else if (exp > levelTable[middle]) {
      // gk.log.info('down');
      startIndex = middle + 1;
      lastAction = SEARCH_ACTION_UP;
    }
    
    // recalculate middle
    middle = Math.floor((startIndex + stopIndex) / 2);
    console.log(startIndex + ':' + stopIndex + ':' + middle);
  }
  console.log('middle:' + middle);
  return middle + 1;
}