(function () {
	'use strict';
	
	var srv = require('http').createServer(handler),
	router = require('./src/app/router'),
	io = require('socket.io')(srv),
	constants = require('./src/shared/constants'),
	broker = require('./src/shared/broker'),
	handlerMappings = require('./src/app/handlerMappings');

	function handler (req, res) {

		var response = router.resolve(req.url, __dirname);

		if (!response) {
			return;
		}

		res.writeHead(200, {
			'Content-Type': response.contentType,
			'Content-Length': response.content.length 
		});

		res.end(response.content);
	}

	srv.listen(3000, function () {
		console.log('listening on http://localhost:3000');
	});

	io.on('connection', function (socket) {
		console.log('server received connection');

		socket.on(constants.appName, function (data) {
			broker(handlerMappings, { io: io }).handleMessage(data);
		});

		socket.on('error', function (e) {
			console.log('error: ' + e);
			io = require('socket.io')(srv);
		});
	});

})();