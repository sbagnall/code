/* global localStorage, $ */
'use strict';

var constants = require('../shared/constants');

module.exports = {
	init: init, 
	applyAndStore: applyAndStore,
	tryApply: tryApply
};

function applyConfig(data) {
	if (data.keyBindings) {

		// TODO: apply local configuration settings

		console.log('init keyBindings: ' + JSON.stringify(data.keyBindings));
	}
} 

function applyAndStore(data) {

	applyConfig(data);

	var obj = JSON.parse(
		localStorage.getItem(constants.appName));

	localStorage.setItem(
		constants.appName,
		JSON.stringify($.extend(true, obj, data)));
}

function tryApply() {
	var data = JSON.parse(
		localStorage.getItem(constants.appName));

	if (data) {
		applyConfig(data);
		return true;
	} else {
		return false;
	}
}

function init (socket) {
	socket.on(constants.appName, function (data) {
		// handle response from server
		if (data.localConfig) {
			applyAndStore(data.data);
		}
	});

	// try to apply bindings from localStorage
	if (!tryApply()) {
		// request form server
		socket.emit(constants.appName, {
			localConfig: true
		});
	}
}
