/* global $, document */
'use strict';

var constants = require('../shared/constants');

module.exports = { init: init }; 

/// replaces bindings passed in - leaves other bindings as they are
function init (socket, keyBindings) {

	$(document).off('keydown');
	$(document).on('keydown', function (e) {

		keyBindings.some(function (item) {

			item = $.extend(
				true, 
				{ key: { ctrl: false, alt: false, shift: false }},
				item);

			if ((e.ctrlKey === item.key.ctrl) &&
				(e.altKey === item.key.alt) &&
				(e.shiftKey === item.key.shift)	&& 
				(e.which === item.key.which)) {

				socket.emit(constants.appName, item.action);

				e.preventDefault();
				
				return true;
			}
		});
	});
}
