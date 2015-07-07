'use strict';

var constants = require('../shared/constants');

module.exports = { handleMessage: handleMessage };

function handleMessage(io, data) {

	if (data.keydown) {

		// TODO: handle key press

	} else if (data.localConfig) {

		if (data.data) {

			// TODO: save config on server storage

		} else {
			
			// TODO: retrieve from server storage -
			// for now emit temp data
			
			io.emit(constants.appName, {
				localConfig: true,
				data: {
					keyBindings: [
						{
							key: { ctrl: true, which: 17 },
							action: constants.badger
						}
					]
				}
			});
		}
	}
}