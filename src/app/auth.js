'use strict';

var constants = require('../shared/constants'),
	cookie = require('cookie'),
	cookieParser = require('cookie-parser'),
	session = require('client-sessions'),
	sessionCookieName = constants.appName + '_session',
	secret = process.env[constants.appName + '_SECRET'],
	bodyParser = require('body-parser');

module.exports = init;

function init(app, io) {
	app.use(bodyParser.json());       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));
	app.use(cookieParser);
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

	io.set('authorization', function (data, accept) {
		if (data.headers.cookie) {
			data.cookie = cookie.parse(data.headers.cookie);
			data.sessionID = data.cookie[sessionCookieName];
		} else {
			return accept('no cookie trnsmitted', false);
		}
		accept(null, true);
	});
}