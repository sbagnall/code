/* global io, window, jQuery */
window.sbagnall = window.sbagnall || {};
window.sbagnall.client = window.sbagnall.client || (function ($, io) {

	'use strict';

	var socket = io('http://localhost:3000'),
		localConfig = require('./localConfig'),
		keyMapping = require('./keyMapping');

	var init = function () {
		keyMapping.init(socket);
		localConfig.init(socket);
	};

	return { 
		init: init,
	};

})(jQuery, io);