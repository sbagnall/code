(function (getResource, EventEmitter, undefined) {
	'use strict';

	getResource.exports = function (c) {
		var emitter = new EventEmitter();
		process.nextTick(function () {
			var count = 0;
			emitter.emit('start');
			var t = setInterval(function () {
				emitter.emit('data', ++count);
				if (count === c) {
					emitter.emit('end', count);
					clearInterval(t);
				}
			}, 10);
		});

		return (emitter);
	};
})(module, require('events').EventEmitter);

