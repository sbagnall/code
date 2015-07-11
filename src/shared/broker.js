'use strict';

module.exports = function (handlers, context) {

	function handleMessage(message) {
		handlers(context).some(function (item) {
			if (item.predicate(message)) {
				item.handler(message);
				return true;
			}
		}); 
	}

	return { handleMessage: handleMessage };
};