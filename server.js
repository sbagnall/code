(function () {
	'use strict';
	
	var express = require('express'),
		app = express(),
		http = require('http'),
		server = http.createServer(app),
		io = require('socket.io')(server),
		constants = require('./src/shared/constants'),
		broker = require('./src/shared/broker'),
		handlerMappings = require('./src/app/handlerMappings'),
		session = require('client-sessions'),
		sessionCookieName = constants.appName + '_session',
		secret = process.env[constants.appName + '_SECRET'],
		cookie = require('cookie'),
		bodyParser = require('body-parser');

	app.use(bodyParser.json());       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	}));
	app.use(session({
		cookieName: sessionCookieName,
		secret: secret,
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
		cookie: {
			ephemeral: true,
			httpOnly: true
		} 
	}));
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/node_modules/jquery/dist'));
	app.use(express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

	app.post('/', function (req, res) {
		var username = req.body.username,
			password = req.body.password;
		
		if (username && password) {
			console.log('username: ' + username + ' password: ' + password);
		} else {
			console.log('no authentiction details received');
		}

		req[sessionCookieName].userID = 'validated user id';

		res.end();
	});

	app.get('/', function (req, res) {
		var username = req.query.username,
			password = req.query.password;

		if (username && password) {
			console.log('username: ' + username + ' password: ' + password);
		} else {
			console.log('no authentiction details received');
		}

		req[sessionCookieName].userID = 'validated user id';

		res.end();
	});

	server.listen(3000, function () {
		console.log('listening on http://localhost:3000');
	});

	server.on('error', function (e) {
		console.log('error: ' + e);
	});


	io.set('authorization', function (data, accept) {
		if (data.headers.cookie) {
			data.cookie = cookie.parse(data.headers.cookie);
			data.sessionID = data.cookie[sessionCookieName];
		} else {
			return accept('no cookie trnsmitted', false);
		}
		accept(null, true);
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