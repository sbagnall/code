'use strict';

var	session = require('express-session'),
	constants = require('../shared/constants'),
	secret = process.env[constants.appName + '_SECRET'];

module.exports =  {
	init: function (app, io) {

		var sess = {
		  secret: secret,
		  cookie: {},
		  resave: false,
		  saveUninitialized: false
		};
		 
		if (app.get('env') === 'production') {
		  app.set('trust proxy', 1); // trust first proxy 
		  sess.cookie.secure = true; // serve secure cookies 
		}

		var sessionMiddleware = session(sess);

		io.use(function (socket, next) {
			sessionMiddleware(socket.request, socket.request.res, next);
		});

		app.use(sessionMiddleware);
	}
};

