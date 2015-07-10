/* global localStorage, $ */
module.exports = (function () {
	'use strict';

	var instance;

	function getInstance(socket) {
		if (!instance) {
			instance = new LocalConfig(socket);
		}

		return instance;
	}

	return { instance: getInstance };

	function LocalConfig(socket) {

		var keyMapping = require('./keyMapping'),
			constants = require('../shared/constants.js');

		function applyConfig(data) {
			if (data.keyBindings) {

				keyMapping.init(socket, data.keyBindings);

				// TODO: apply local configuration settings

				
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

		function init () {
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

		return {
			init: init, 
			applyAndStore: applyAndStore,
			tryApply: tryApply
		};

	}
})();