(function () {
	'use strict';
	
	var connect = require('connect'),
		app = connect(),
		serveStatic = require('serve-static'),
		http = require('http'),
		server = http.createServer(app),
		io = require('socket.io')(server),
		constants = require('./src/shared/constants'),
		broker = require('./src/shared/broker'),
		handlerMappings = require('./src/app/handlerMappings');

	app.use(serveStatic(__dirname + '/public'))
		.use(serveStatic(__dirname + '/node_modules/jquery/dist'))
		.use(serveStatic(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

	server.listen(3000, function () {
		console.log('listening on http://localhost:3000');
	});

	server.on('error', function (e) {
		console.log('error: ' + e)
	});

	io.on('connection', function (socket) {
		console.log('server received connection from ' + socket.id);

		socket.on(constants.appName, function (data) {
			broker(handlerMappings, { io: io }).handleMessage(data);
		});

		socket.on('disconnect', function () {
			console.log('client disconnected: ' + socket.id);
		});

		socket.on('error', function (err) {
			console.log('error on socket ' + socket.id + ': ' + err);
		});

	});
})();