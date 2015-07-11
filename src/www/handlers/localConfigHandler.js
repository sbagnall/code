'use strict';

module.exports = function (localConfig) {

	function handle (message) {
		localConfig.applyAndStore(message.data);
	}
	
	return handle;
};

