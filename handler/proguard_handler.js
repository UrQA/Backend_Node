
'use strict';
var exec = require('child_process').exec, child;
var ProguardHandler = exports;
var self = ProguardHandler;

ProguardHandler.proguard_obfuscation = function( ,callback) {
	child = exec('/usr/bin/java -jar ~/Applications/example.jar',
		function (error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if(error !== null){
				console.log('exec error: ' + error);
			}
		});	
	child.kill('SIGHUP');
}
