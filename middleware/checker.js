'use strict';
var gk             = require('../common');
var _helper        = require(__dirname + '/../utils/helper');

module.exports = function() {
  return function(req, res, next) {    
    //gk.log.debug('[REQUEST URL] ',      req.url);
    //gk.log.debug('[REQUEST PARAMS] ', req.body);
    req.body.url = req.url;
    if (isNotNeedToBeChecked(req.url)) {
      return next();
    }
  }

};


function isNotNeedToBeChecked(path) {
  var paths = ['/test','/crypto/'];
  for (var i = 0; i < paths.length; i++) {
    if (path.substr(0, paths[i].length) == paths[i]) return true;
  }

  return false;
}


function sendResult(res, result, err) {
  _helper.generateResult(result, err, err);
  res.send(result);
}
