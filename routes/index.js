'use strict'
var url_control = require(__dirname + '/../controllers/url_control');
var url_control_jsonp = require(__dirname + '/../controllers/url_control_jsonp');

var routes = function(app) {
	// this is for legact rest apis for android
	app.post('/urqa/client/connect', url_control.connect);
	app.post('/urqa/client/send/exception', url_control.receive_exception);
	app.post('/urqa/client/send/exception/native', url_control.receive_native);
	app.post('/test/',url_control.receive_test_data);
	app.get('/$',url_control.url_redirect);
	app.post('/urqa', url_control.url_redirect);
	// jsonp
	app.get('/urqa/client/jsonp', url_control_jsonp.jsonp_wrapper );

	// Encrypt Test
	app.post('/test_enc', url_control.url_test_enc );
}
exports.route = routes;
