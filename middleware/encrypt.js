'use strict';

var CryptoJS = require("crypto-js");

var INITIALIZE_VECTOR 	= '0000000000000000';
var CHIPER_TYPE   		= 'aes-256-cbc';
//var ENCODE_TYPE 		= 'base64';
//var HASH_TYPE   		= 'sha256';
var HASH_UPDATE_DATA  	= 'urqa_service_NumberONE!!!';
var KEY 				= CryptoJS.SHA256( HASH_UPDATE_DATA );
var iv  				= CryptoJS.enc.Hex.parse( INITIALIZE_VECTOR );

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
			 * 	{ encdata: "encrypt ,,,", src_len: 1111 }
			 */
			var encdata = req.body.encdata;
			var src_len = req.body.src_len;

			var decdata = CryptoJS.AES.decrypt( encdata, KEY, { iv: iv } )
									  	.toString( CryptoJS.enc.Utf8 );

			// change encrypt body to src data
			req.body = JSON.parse(decdata);

		}

		next();

	};
};
