module.exports = function (context) {
	return [
		{
			predicate: function (message) { return message.localConfig; },
			handler: require('./localConfigHandler')(context.localConfig)
		}
	];
};
