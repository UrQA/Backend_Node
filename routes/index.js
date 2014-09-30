/**
 * Created by duhyeong1.kim on 2014-08-20.
 */
'use strict'
var url_control = require(__dirname + '/../controllers/url_control');
var url_control_jsonp = require(__dirname + '/../controllers/url_control_jsonp');

var routes = function(app) {
    /*
    this is for legact rest apis for android
     */
    app.post('/urqa/client/connect', url_control.connect);
    app.post('/urqa/client/send/exception', url_control.receive_exception);
    app.post('/urqa/client/send/exception/native', url_control.receive_native);
    app.post('/test/',url_control.receive_test_data);


    /**
     * add jsonp wrapper url
     *
     *      2014.09.13  famersbs
     */
    app.get('/urqa/client/jsonp', url_control_jsonp.jsonp_wrapper );

    /*
    this is for new rest apis for android, ios, unity, cordova
     */
    /*
    app.post('/urqa/client/android/connect', url_control.connect_4_android);
    app.post('/urqa/client/android/exception', url_control.receive_exception_4_android);
    app.post('/urqa/client/android/exception/native', url_control.receive_native_4_android);

    app.post('/urqa/client/ios/connect', url_control.connect_4_ios);
    app.post('/urqa/client/ios/exception', url_control.receive_exception_4_ios);
    app.post('/urqa/client/ios/exception/native', url_control.receive_native_4_ios);

    app.post('/urqa/client/unity/connect', url_control.connect);
    app.post('/urqa/client/unity/exception', url_control.receive_exception);
    app.post('/urqa/client/unity/exception/native', url_control.receive_native);

    app.post('/urqa/client/cordova/connect', url_control.connect);
    app.post('/urqa/client/cordova/exception', url_control.receive_exception);
    app.post('/urqa/client/cordova/exception/native', url_control.receive_native);
    */
    app.get('/$',url_control.url_redirect);
    app.post('/urqa', url_control.url_redirect);
}
exports.route = routes;



