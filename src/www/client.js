/* global io, window */
window.sbagnall = window.sbagnall || {};
window.sbagnall.client = window.sbagnall.client || (function (io) {

	'use strict';

	var constants = require('../shared/constants'),
		socket = io.connect('http://localhost:3000'),
		localConfig = require('./localConfig').instance(socket),
		broker = require('../shared/broker'),
		handlerMappings = require('./handlerMappings');

	socket.on(constants.appName, function (message) {
		broker(handlerMappings, { localConfig: localConfig })
			.handleMessage(message);
	});

	socket.on('connect', function () {
		console.log('connected');
	});

	socket.on('disconnect', function (e) {
		console.log('disconnected: ' + e);
	});

	socket.on('error', function (e) {
		console.log('error: ' + e);
	});

	var init = function () {
		localConfig.init();
	};

	return { 	
		init: init,
	};

})(io);