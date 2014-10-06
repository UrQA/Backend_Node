'use strict';

module.exports = function() {
  return function(err, req, res, next) {
      //console.log(err, req.body);
      //console.log( err.stack );
      console.log("error ", err.stack );
      if (err) {
          return res.send(500, 'Error' + err.stack);
      }
      next();
  }
};
