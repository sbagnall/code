(function () {
	'use strict';
	
	var express = require('express'),
		bodyParser = require('body-parser'),
		app = express(),
		http = require('http'),
		server = http.createServer(app),
		io = require('socket.io')(server),
		constants = require('./src/shared/constants'),
		broker = require('./src/shared/broker'),
		handlerMappings = require('./src/app/handlerMappings'),
		session = require('./src/app/session'),
		auth = require('./src/app/auth');
	
	app.use(express.static(__dirname + '/public/favicon.ico'));
	app.use(express.static(__dirname + '/dist'));
	app.use(express.static(__dirname + '/node_modules/jquery/dist'));
	app.use(express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

	app.use(bodyParser.urlencoded({ extended: true }));

	session.init(app, io);
	
	server.listen(3000, function () {
		console.log('listening on http://localhost:3000');
	});

	server.on('error', function (e) {
		console.log('error: ' + e);
	});

	io.on('connection', function (socket) {
		console.log('server received connection from ' + socket.id);

		if (!auth.isAuthorized(socket.request.session)) {
			console.log('connection rejected');

			socket.conn.close();
			return;
		}

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

	app.all('/', function (req, res) {

		var Model = require('./src/app/Model'),
			model = new Model(req);

		if (auth.isAuthenticateAttempt(model)) {
			if (auth.tryAuthorize(req.session, model)) {
				res.redirect('/');
			} else {
				res.sendFile(__dirname + '/public/login.html');
			}
		} else {
			if (!auth.isAuthorized(req.session)) {
				res.sendFile(__dirname + '/public/login.html');
			} else {
				res.sendFile(__dirname + '/public/index.html');	
			}
		}
	});

})();