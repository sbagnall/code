'use strict';

module.exports = function(user, io) {

	var constants = require('../../shared/constants');

	function handle (message) {
		console.log('received: ' + message + ' from ' + user.username + '(' + user.userid + ')');

		io.emit(user.socketId, constants.appName, message);
	}

	return handle;
};	

