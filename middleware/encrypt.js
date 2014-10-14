'use strict';

var CryptoJS = require("crypto-js");

var INITIALIZE_VECTOR 	= '0000000000000000';
var CHIPER_TYPE   		= 'aes-256-cbc';
var iv  				= CryptoJS.enc.Hex.parse( INITIALIZE_VECTOR );

var enckey_manager = require( "../utils/enckey_manager");

/* https://www.npmjs.org/package/crypto-js */

module.exports = function() {

	console.log('Enabled Encrypt');

	return function( req, res, next) {

		/*
		 *
		 *  this option is request of Encrypt
		 * 
		 * urqa-encrypt-opt is encrypt type
		 * this version is support only aes-256-cbc-pkcs5padding+base64 mode
		 * 
		 */
		if( req.headers['urqa-encrypt-opt'] ){
			/*
			 * encrypt request format sample
			 * 	{ apikey:"key", encdata: "encrypt ,,,", src_len: 1111 }
			 */
			var apikey = req.body.apikey;
			var encdata = req.body.encdata;
			var src_len = req.body.src_len;

			// get token
			enckey_manager.getEncToken( apikey, false, function( token ){

				if( null == token ){

					// token is null...
					var result = { 'state': 'fail', 'reson' : 'Token Create Fail' };
        			res.status(406).send(result);

				}else{

					var KEY = CryptoJS.SHA256( token );

					var decdata = CryptoJS.AES.decrypt( encdata, KEY, { iv: iv } )
											  	.toString( CryptoJS.enc.Utf8 );

					// change encrypt body to src data
					req.body = JSON.parse(decdata);
					next();

				}
			} );	// 이 부분을 async 하게 바꿔야 한다... 


		} else {
			next();
		}

	};
};
