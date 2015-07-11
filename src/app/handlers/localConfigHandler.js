'use strict';

module.exports = function (io) {

	var constants = require('../../shared/constants'),
		defaultKeyBindings = require('../defaultKeyBindings');

	function handle(message) {

		if (message.data) {

			// TODO: save config on server storage

		} else {
			
			// TODO: retrieve from server storage -
			// for now emit temp data
			
			io.emit(constants.appName, {
				localConfig: true,
				data: {
					keyBindings: defaultKeyBindings
				}
			});
		}
	}

	return handle;

};
