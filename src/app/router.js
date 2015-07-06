'use strict';

var fs = require('fs'),
	path = require('path'),
	scriptPaths = [
		'public', 
		'node_modules/socket.io/node_modules/socket.io-client',
		'node_modules/jquery/dist'
	],
	ignore = [
		/favicon\.ico/i
	];

module.exports = { resolve: resolve };

function handleScripts(url, root) {
	console.log('getting: ' + url);
	var obj = null;

	scriptPaths.forEach(function (value) {
		var scriptPath = path.join(root, value, url);

		if (fs.existsSync(scriptPath)) {
			obj = {
				content: fs.readFileSync(scriptPath), 
				contentType: 'text/javascipt' 
			};

			return;
		}
	});

	return obj;
}

function isIgnore(url) {

	var isIgnored = false;

	ignore.forEach(function (item) {
		if (item.test(url)) {
			isIgnored = true;
		}
	});

	return isIgnored;
}

function resolve (url, root) {

	if (isIgnore(url)) {
		return null;
	}
		
	if (path.extname(url) === '.js') {
		return handleScripts(url, root);
	} 

	var localPath = path.join(
		root, 
		'public',
		'index.html');

	return {
		content: fs.readFileSync(localPath),
		contentType: 'text/html'
	}; 
}
