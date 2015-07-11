// app/handlerMappings.js

'use strict';

module.exports = function app_handlerMappings (context) {
	return [
		{
			predicate: function (message) { return message.localConfig; },
			handler: require('./handlers/localConfigHandler')(context.io)
		},
		{
			predicate: function () { return true; },
			handler: require('./handlers/actionHandler')(context.io)
		}
	];
};
