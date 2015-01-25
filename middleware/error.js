'use strict';

module.exports = function() {
  return function(err, req, res, next) {
      //console.log("error ", err.stack );
      if (err) {
          return res.send(500, 'Error' + err.stack);
      }
      next();
  }
};
