'user strict';
var cipher   = require(__dirname + '/../utils/cipher_utils');
var remdomer = require(__dirname + '/../utils/chance_utils');
var chance   = new remdomer();

var ramdomKey  =  ['l','D','x','Y','Z','+','-','k'];

// 평문 데이터 암호화 Encoding..  param 는  string 이여야 한다
exports.encoder = function(paramData){

  var indexData = chance.pick(ramdomKey);
  //console.log("암호화 key index->>>>>>>>>>>>>>>>>>>>",indexData);

  var key = getKeyIndex(indexData);
  console.log("암호화 keys-->>",key);

  console.log("암호화 encryptData -->>>>>>>", JSON.stringify(paramData));
  var encryptData = cipher.encrypt_wallaby(JSON.stringify(paramData), key);
  
  // 뒤에서 5번째 데이터에 indexData를 넣는다
  if(encryptData != null){
    var count = encryptData.length - 4;
    var frist = encryptData.substring(0, count);
    //console.log("암호화 frist Data -->>", frist);
  
    var last  = encryptData.substring(count, encryptData.length);
    //console.log("암호화 last Data -->>", last);
  
    var resetData = frist + indexData + last;
    console.log("LAST 암호화 된 Data -->", resetData);
    return resetData;
  }

}


// 암호화된 데이터 복호화 decoding..   param 는  string 이여야 한다
exports.decoder = function(paramData){
  if(paramData != null){
    // 뒤에서 5번째 데이터에서 암호화 key index를 가져 온다
    var count = paramData.length - 5;
    var frist =  paramData.substring(0, count);
    
    
    var last  = paramData.substring(count, paramData.length);  

    // 암호화 key index 추출
    var keyIndex = last.substring(0,1);
    //console.log("복호화 key index -->>>>>>>>>>>>>>>", keyIndex);

    //암호화 된 key 추출
    var key  = getKeyIndex(keyIndex);
    console.log("복호화 key-->>", key);

    var temp = last.substring(1, paramData.length);

    var origin     = frist + temp;  
    console.log("복호화 할 데이터:", origin);

    var decryptData = cipher.decrypt_wallaby(origin, key);
    console.log("복호화 data-->>>>>", decryptData);
    return JSON.parse(decryptData);
  }
}


function getKeyIndex(keyIndex){
  var key;
  switch (keyIndex) {
    case 'l':
        key = 'ITzKFvm5VRwj2oyJAytAHbzEqru9oAHY';
        break;
    case 'D':
        key = '770A8A65DA156D24EE2A093277530142';
        break;
    case 'x':
        key = 'BGQSDb5fjKQMx2GlK2pgUkBp0oGA1XBP';
        break;
    case 'Y':
        key = 'aFTwKX013M9A2y9FOYLtQm6VtYa4ECuT';
        break;
    case 'Z':
        key = 'WVHzA2oHVjtidipsRWi2P54sW7FRqOv1';
        break;
    case '+':
        key = 'AZprwFetViIxq28dYDiga4DC1QQgybvk';
        break;
    case '-':
        key = '4aJTqnQmCOog31SxZCzV8QUpGxI5vgJI';
        break;
    case 'k':
        key = 'dnYfeVWgjauxR/b+uXFsZ9FoDefX2p7T';
        break;
    default:
        key = 'ITzKFvm5VRwj2oyJAytAHbzEqru9oAHY';
        break;
    }

  return key;
}
