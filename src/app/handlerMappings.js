module.exports = function (context) {
	return [
		{
			predicate: function (message) { return message.localConfig; },
			handler: require('./handlers/localConfigHandler')(context.io)
		},
		{
			predicate: function () { return true; },
			handler: require('./handlers/actionHandler') 
		}
	];
};
