(function () {
	'use strict';
	
	var express = require('express'),
		favicon = require('serve-favicon'),
		config = require('./config'),
		bodyParser = require('body-parser'),
		app = express(),
		http = require('http'),
		server = http.createServer(app),
		ioServer = require('./src/app/ioServer'),
		io = ioServer.init(server),
		session = require('./src/app/session'),
		auth = require('./src/app/auth');
		
	
	app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(express.static(__dirname + '/dist'));
	app.use(express.static(__dirname + '/node_modules/jquery/dist'));
	app.use(express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

	app.use(bodyParser.urlencoded({ extended: true }));

	session.init(app, io);
	
	server.listen(config.port, function () {
		console.log('listening on http://localhost:' + config.port);
	});

	server.on('error', function (e) {
		console.log('error: ' + e);
	});

	app.all('/', function (req, res) {

		var Model = require('./src/app/Model'),
			model = new Model(req);

		if (auth.isAuthenticateAttempt(model)) {
			auth.tryAuthorize(req.session, model, function (err, isAuthorized) {

				if (err || !isAuthorized) {
					res.sendFile(__dirname + auth.loginPage);
				} else {
					res.redirect('/');
				} 
			});
		} else {
			if (!auth.isAuthorized(req.session)) {
				res.sendFile(__dirname + auth.loginPage);
			} else {
				res.sendFile(__dirname + '/public/index.html');	
			}
		}
	});

})();