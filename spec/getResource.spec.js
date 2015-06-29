describe('getResource', function () {
	var target;

	beforeEach(function () {
		target = require('../app/getResource');
	});

	it('is defined', function () {
		expect(target).toBeDefined();
	});

	it('emits a start event', function () {

		var isStartCalled = false;

		runs(function () {
			target(5).on('start', function () {
				isStartCalled = true;
			});
		});

		waitsFor(function () {
			return isStartCalled;
		}, "start event to fire", 50);
	});

	it('emits the correct number of data events', function () {

		var isValid = true,
			expectedCount = 10,
			actualCount = 0;

		runs(function () {
			var count = 0;
			target(10).on('data', function (e)
			{
				count += 1;
				if (count !== e) {
					isValid = false;
				}

				actualCount = count;
			});
		});

		waitsFor(function () {
			return isValid && expectedCount === actualCount;
		}, "the correct number of data events to fire - num fired: " + actualCount, 110);

	});

	it('emits an end event with the total count when finished', function () {
		var isValid = false,
			expectedCount = 10;

		runs(function () {
			target(10).on('end', function (e)
			{
				if (expectedCount === e) {
					isValid = true;
				}
			});
		});

		waitsFor(function () {
			return isValid;
		}, 'the end event to fire', 110);

	});
});