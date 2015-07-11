'use strict';

module.exports = function (localConfig) {

	var actions = require('../../shared/actions');
	
	function handle (message) {

		console.log('received: ' + message);

		switch (message) {
			case actions.GameOptions:
			localConfig.requestFromServer();
			break; 
		}
	}

	return handle;
};	

