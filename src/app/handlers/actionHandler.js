'use strict';

module.exports = function(user, io) {

	var constants = require('../../shared/constants');

	function handle (message) {
		console.log('received: ' + message + ' from ' + user.username + '(' + user.userid + ')');

		user.sockets.some(function (item) {
			io.emit(item, constants.appName, message);
		});
		
	}

	return handle;
};	

