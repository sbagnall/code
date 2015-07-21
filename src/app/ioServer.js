'use strict';

var auth = require('./auth'),
	constants = require('../shared/constants'),
	broker = require('../shared/broker'),
	handlerMappings = require('./handlerMappings');

module.exports = (function () {
	var isAuthorized = function (socket) {
			if (!auth.isAuthorized(socket.request.session)) {
				console.log('io connection rejected: not authorized');

				socket.conn.close();
				return false;
			}

			return true;
		},

		init = function (server) {
		
			var io = require('socket.io')(server);

			io.on('connection', function (socket) {
				console.log('server received connection attempt from ' + socket.id);

				if (isAuthorized(socket)) {

					var user = socket.request.session.user;

					user.socketId = socket.id;

					console.log('added socket: ' + socket.id + ' to user: ' + user.username + '('+ user.userid + ')');

					socket.on(constants.appName, function (data) {
						if (isAuthorized(socket)) {
							broker(handlerMappings, { user: user, io: io }).handleMessage(data);
						} 
					});

					socket.on('disconnect', function () {
						console.log('client disconnected: ' + socket.id);

						user.socketId = null;

						console.log('removed socket: ' + socket.id + ' from user: ' + user.username + '('+ user.userid + ')');
					});

					socket.on('error', function (err) {
						console.log('error on socket ' + socket.id + ': ' + err);
					});
				}
			});

			return io;
		};

	return {
		init: init
	};
})();