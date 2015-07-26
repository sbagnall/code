'use strict';

module.exports = function(user, io) {

	var constants = require('../../shared/constants');

	function handle (message) {
		console.log('received: ' + message + ' from ' + user.username + '(' + user._id + ')');

		// TODO: deal with message
		
		var socket = io.sockets.connected[user.socketId];

		if (socket) {
			io.emit(constants.appName, message);	
		}
	}

	return handle;
};	

