module.exports = function (io) {

	var constants = require('../../shared/constants');

	function handle(message) {

		if (message.data) {

			// TODO: save config on server storage

		} else {
			
			// TODO: retrieve from server storage -
			// for now emit temp data
			
			io.emit(constants.appName, {
				localConfig: true,
				data: {
					keyBindings: [
						{
							key: { which: 65 },
							action: constants.Action.badger
						},
						{
							key: { which: 66 },
							action: constants.Action.otter
						}
					]
				}
			});
		}
	}

	return handle;

};
