'user strict';
// module
var crypto = require('crypto');
var INITIALIZE_VECTOR = '0000000000000000';
var CHIPER_TYPE = 'aes-256-cbc';
var ENCODE_TYPE = 'base64';


var HASH_TYPE         = 'sha256';
var HASH_UPDATE_DATA  = 'urqa_service_NumberONE!!!';
var KEY = crypto.createHash(HASH_TYPE).update(HASH_UPDATE_DATA).digest();

exports.encrypt = function(str) {
  try {
    var cipher = crypto.createCipheriv(CHIPER_TYPE, KEY, INITIALIZE_VECTOR);
    var result = cipher.update(str, 'utf8') + cipher.final();
    console.log('res1: ' + result);

    var ret = new Buffer(result, 'binary');

    return ret.toString(ENCODE_TYPE);
  } catch (e) {
    return null;
  }
}


exports.decrypt = function(str) {
  try {
    var decoded = new Buffer(str, ENCODE_TYPE);
    var decipher = crypto.createDecipheriv(CHIPER_TYPE, KEY, INITIALIZE_VECTOR, decoded);
    var result = decipher.update(decoded, 'binary') + decipher.final();

    var ret = new Buffer(result, 'binary');
    console.log('res1: ' + ret.toString('utf8'));

    return ret.toString('utf8');
  } catch (e) {
    return null;
  }
}


exports.xorEncrypt = function(key, str) {
  var encrypted = "";
  var keyCount = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i) ^ key.charCodeAt(keyCount++);
    encrypted += String.fromCharCode(c);
    if (keyCount == key.length) keyCount = 0;
  }

  return encrypted.toString('utf-8');
};

exports.xorDecrypt = function(key, str) {
  var decrypted = "";
  var keyCount = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i) ^ key.charCodeAt(keyCount++);
    decrypted += String.fromCharCode(c);
    if (keyCount == key.length) keyCount = 0;
  }

  return decrypted.toString('utf-8');
};

/*
// Xor 테스트 
var text = 'Hello';
var encText = exports.encrypt(text);
var decText = exports.decrypt(encText)
console.log('--------------------');
console.log(encText);
console.log(decText);
console.log('--------------------');

encText = exports.xorEncrypt("test1", "hellasdfljaksldjfasdkflkajsdflkjasdkflo");
decText = exports.xorDecrypt("test1", encText);
console.log('--------------------');
console.log(encText);
console.log(decText);
console.log('--------------------');
*/