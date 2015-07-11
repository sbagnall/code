'use strict';

module.exports = function(io) {

	var constants = require('../../shared/constants');

	function handle (message) {
		console.log('received: ' + message);

		io.emit(constants.appName, message);
	}

	return handle;
};	

