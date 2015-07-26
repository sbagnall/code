'use strict';

var DataAccess = require('../DataAccess'),
	da = new DataAccess(),
	constants = require('../../shared/constants'),
	defaultKeyBindings = require('../defaultKeyBindings');

module.exports = function (user, io) {

	function handle(message) {

		da.open(function (err) {
			if (!err) {
				if (message.data) {
					da.saveLocalConfig(user, message.data, function (err) {
						if (err) {
							console.log('error saving local config data for user ' + 
								user.username + '(' + user._id + '):' + 
								err);
						}
					});
				} else {
					da.loadLocalConfig(user, function (err, data) {
						if (err || !data) {
							data = {
								keyBindings: defaultKeyBindings
							};
						}

						var socket = io.sockets.connected[user.socketId];

						if (socket) {
							socket.emit(constants.appName, {
								localConfig: true,
								data: data
							});	
						} 
					});
				}
			}
		});
	}

	return handle;

};
