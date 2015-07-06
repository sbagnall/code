/* global io, window, document, jQuery */
window.sbagnall = window.sbagnall || {};
window.sbagnall.client = window.sbagnall.client || (function ($, io) {

	'use strict';

	var socket = io('http://localhost:3000'),
		constants = require('../shared/constants.js');

	var init = function () {
		$(document).on('keydown', function (e) {
			socket.emit(constants.appName, {
				'type': e.type,
				'ctrl': e.ctrlKey,
				'alt': e.altKey,
				'shift': e.shiftKey,
				keyChar: e.which
			});
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	};

	return { init: init };

})(jQuery, io);