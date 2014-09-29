'use strict';

var gk      = require('../common');
var convert = require(__dirname + '/../utils/param_convert');
var _helper = require(__dirname + '/../utils/helper');

exports.encryptData = function(req, res) {  
  var result = {};
  var data   = req.body.data;
 // console.log("DATA->>>>:", data);

  var retEncodingData ="";
  if(data != null){
    var retEncodingData = convert.decoder(data.toString());
    //console.log("복호화 Data---->>",retEncodingData);

    if(retEncodingData != null){
      var retDecodingData = convert.encoder(retEncodingData);
      console.log("암호화 된 Data:", retDecodingData);
    
      result.data = JSON.parse( JSON.stringify(retDecodingData) );
      console.log("=>>", result.data);
    }
  }

  res.send(result);

};

/* // encrypt test
var strData = {"email":"abab@gmail.com","user_id":"abab@gmail.com","market_id":"A","device_id":"abab@gmail.com","app_version":"1.0"}

console.log("======= param_convert encrypt test ===");
console.log("encrypt data : ",strData);

var retEncodingData = convert.encoder(strData);
//console.log("Encoding Data Data:",retEncodingData);

var retDecodingData = convert.decoder(retEncodingData);
//console.log("Decoding Data Data Data:",retDecodingData);

console.log("=== param_convert encrypt test END ===");
// QRQRpWmail.com","user_id":"abab@gmail.com","market_id":"A","device_id":"abab@gmail.com","app_version":"1.0"}
*/



/*
 // Gacha TEST
  var _baseClass                = require('../data/class_data.json');
  var _classGacha               = require('../data/class_gacha.json');
  var gacha                     = _classGacha.class_gacha;
  for(var i = 0; i < 20; i++){
    var random = gk.commonUtils.getRandom(0, 20);
    var index = Math.floor(Number(gacha.percent) * (random / 100));
    gk.log.debug('random index : ' + index);

    var classId = gacha.class_id[index];
    //gk.log.info('classId----->>>> ' + gacha.class_id[index]);

    var classData = _baseClass[classId];
    gk.log.info('class data-->>>' + JSON.stringify(classData));
    gk.log.info('class name-->>>' + classData.class_name);
    gk.log.info('walk["min"]-->>>' + classData.walk["min"]);
    gk.log.info('walk["max"]-->>>' + classData.walk["max"]); 

    //gk.log.info('class class_name-->>>' + classData.class_name);

    // var randomClassIndex = Math.floor(Math.random() * gacha.class_id.length);
    // gk.log.debug('randomClassIndex: ' + randomClassIndex);

    // var classId = gacha.class_id[randomClassIndex];
    // gk.log.debug('2차 class id: ' + classId);
  }
*/




