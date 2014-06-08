'use strict'
var url_control = require(__dirname + '/../controllers/url_control');

var routes = function(app) {
  
  //client module
  app.post('/urqa/client/connect', url_control.connect);
  app.post('/urqa/client/send/exception', url_control.receive_exception);
  app.post('/urqa/client/send/exception/native', url_control.receive_native);
  app.post('/urqa/client/send/exception/dump/(?P<idinstance>\d+)$', url_control.receive_native_dump);
  //app.post('/urqa/client/send/exception/log/(?P<idinstance>\d+)$', url_control.receive_exception_log);
  //app.post('/urqa/client/send/eventpath', url_control.receive_eventpath);

   app.get('/$',url_control.url_redirect);
   app.post('/urqa', url_control.url_redirect);
}
exports.route = routes;
