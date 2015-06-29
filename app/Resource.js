(function (Resource, EventEmitter, util, undefined) {
	'use strict';

	var resource = function (m) {
		var maxEvents = m,
			self = this;

		process.nextTick(function () {
			var count = 0;
			self.emit('start');
			var t = setInterval(function () {
				self.emit('data', ++count);
				if (count === maxEvents) {
					self.emit('end', count);
					clearInterval(t);
				}
			}, 10);
		});
	};

	util.inherits(resource, EventEmitter);

	Resource.exports = resource;

})(module, require('events').EventEmitter, require('util'));