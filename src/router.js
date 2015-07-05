var fs = require('fs'),
	path = require('path'),
	scriptPaths = [
		'public', 
		'node_modules/socket.io/node_modules/socket.io-client'
	];

module.exports = { resolve: resolve };

function createStream(localPath, mimeType, cb) {
	if (localPath) {
		console.log('... routed to: ' + localPath);

		var rs = fs.createReadStream(localPath);

		cb({
			content: rs, 
			contentType: mimeType 
		});
	}
}

function handleScripts(url, mimeType, cb) {

	scriptPaths.forEach(function (value) {

		var scriptPath = path.join(__dirname, value, url);

		fs.exists(scriptPath, function (exists) {
			if (exists) {
				createStream(scriptPath, mimeType, cb);
			}
		});
	});
}

function handleDefault(url, mimeType, cb) {

	var localPath = path.join(__dirname, 'public', url);

	if (!fs.lstatSync(localPath).isFile()) {
		localPath = path.join(__dirname, 'public', 'index.html');
	}
	
	createStream(localPath, mimeType, cb);
}

function resolve (url, cb) {

	console.log('routing path: ' + url + ' ...');

	switch (path.extname(url)) {
		case '.js':
			handleScripts(url, 'text/javascript', cb);
			break;

		default:
			handleDefault(url, 'text/html', cb);
	}
}
