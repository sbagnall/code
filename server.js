(function () {
	'use strict';
	
	var express = require('express'),
		app = express(),
		http = require('http'),
		server = http.createServer(app),
		io = require('socket.io')(server),
		constants = require('./src/shared/constants'),
		broker = require('./src/shared/broker'),
		handlerMappings = require('./src/app/handlerMappings');
	
	app.use(express.static(__dirname + '/public/js'));
	app.use(express.static(__dirname + '/node_modules/jquery/dist'));
	app.use(express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

	var	session = require('express-session'),
		secret = process.env[constants.appName + '_SECRET'];

	var sess = {
	  secret: secret,
	  cookie: {}
	};
	 
	if (app.get('env') === 'production') {
	  app.set('trust proxy', 1); // trust first proxy 
	  sess.cookie.secure = true; // serve secure cookies 
	}

	app.use(session(sess));

	server.listen(3000, function () {
		console.log('listening on http://localhost:3000');
	});

	server.on('error', function (e) {
		console.log('error: ' + e);
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

	app.all('/', function (req, res) {

		if(req.url === '/favicon.ico') {
			return res.end(''); //stop '/favicon.ico' request	
		}

		var Model = require('./src/app/Model'),
			model = new Model(req);

		if (model.username && model.password) {
			req.session.username = model.username;
			req.session.password = model.password;
			console.log('username: ' + model.username + ' password: ' + model.password);
		} else {
			console.log('no authentiction details received');
		}

		if (req.session.username && req.session.password) {
			res.end('username: ' + req.session.username + ', password: ' + req.session.password);
		} else {	
			res.sendFile(__dirname + '/public/index.html');
		}
	});

})();