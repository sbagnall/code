/* global $, document */

var constants = require('../shared/constants');

module.exports = { init: init }; 

function init (socket) {
	$(document).on('keydown', function (e) {
		socket.emit(constants.appName, {
			keydown: true,
			data: {
				ctrl: e.ctrlKey,
				alt: e.altKey,
				shift: e.shiftKey,
				keyChar: e.which
			}
		});
	});
}
