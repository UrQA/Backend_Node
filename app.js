'use strict';
var gk = require('./common');
process.env.TZ = 'Asia/Seoul';

// express
var express = require('express');
var errorHandler = require('./middleware/error');

// app
var app = express();
	app.configure(function() {
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.compress());
	app.use(errorHandler());
});
// router
var router = require('./routes');
router.route(app);

// encrypt test
app.get('/test_enc', function( req, res ){

	var uri = req.query.uri;	// 이 부분을 변경 해야 할듯 --> 형식을 바꿀필요가 있음
	var data = req.query.data;

	/* https://www.npmjs.org/package/crypto-js */
	var CryptoJS = require("crypto-js");

	var INITIALIZE_VECTOR = '0000000000000000';
	var CHIPER_TYPE = 'aes-256-cbc';
	var ENCODE_TYPE = 'base64';

	var HASH_TYPE         = 'sha256';
	var HASH_UPDATE_DATA  = 'urqa_service_NumberONE!!!';
	var KEY = CryptoJS.SHA256( HASH_UPDATE_DATA );

	console.log( CryptoJS.enc.Hex.parse( INITIALIZE_VECTOR ) );

	var iv  = CryptoJS.enc.Hex.parse( INITIALIZE_VECTOR );

	var aec_Encrypter = CryptoJS.algo.AES.createEncryptor( KEY, { iv: iv } );

	var result = aec_Encrypter.process( data ) + aec_Encrypter.finalize();


	//AES.encrypt( KEY, data, { iv:INITIALIZE_VECTOR } );
	reesult = CryptoJS.enc.Base64.stringify(result);

	console.log( result );


	res.header('Content-type','application/json');
	res.header('Charset','utf8');
	res.jsonp( { result:data} );

});

app.listen(gk.config.port);
console.log("Server started at port " + gk.config.port);
