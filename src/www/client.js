/* global io, window */
window.sbagnall = window.sbagnall || {};
window.sbagnall.client = window.sbagnall.client || (function (io) {

	'use strict';

	var socket = io('http://localhost:3000'),
		localConfig = require('./localConfig').instance(socket);

	var init = function () {
		localConfig.init();
	};

	return { 	
		init: init,
	};

})(io);