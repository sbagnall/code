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
			
			var config = $.extend(
				true, 
				JSON.parse(localStorage.getItem(constants.appName)),
				data);
			
			applyConfig(config);

			localStorage.setItem(constants.appName,	JSON.stringify(config));
		}

		function tryApply() {
			
			var config = JSON.parse(localStorage.getItem(constants.appName));
			
			if (config) {
				applyConfig(config);
				return true;
			}
			
			return false;
		}

		function init () {
			if (!tryApply()) {
				// request form server
				socket.emit(constants.appName, {
					localConfig: true
				});
			}
		}

		return {
			init: init,
			applyAndStore: applyAndStore 
		};

	}
})();