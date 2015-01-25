'use strict';

module.exports = function() {

  return function(err, req, res, next) {
<<<<<<< HEAD
      //console.log('aa');
=======
      //console.log(err, req.body);
      //console.log( err.stack );
      console.log("error ", err.stack );
>>>>>>> c042354a52ad7f7fede496c14c5c420b73935840
      if (err) {
          return res.send(500, 'Error' + err.stack);
      }
      next();
  }
};
