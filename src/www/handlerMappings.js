// www/handlerMappings.js
'use strict';

module.exports = function www_handlerMappings (context) {
	return [
		{
			predicate: function (message) { return message.localConfig; },
			handler: require('./handlers/localConfigHandler')(context.localConfig)
		},
		{
			predicate: function () { return true; },
			handler: require('./handlers/actionHandler')(context.localConfig)
		}
	];
};
