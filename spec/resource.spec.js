describe('resource', function () {
	var Resource;

	beforeEach(function () {
		Resource = require('../app/resource');
	});

	it('is defined', function () {
		var target = new Resource(5);
		expect(target).toBeDefined();
	});

	it('emits a start event', function () {

		var isStartCalled = false;

		runs(function () {
			var target = new Resource(5);
			target.on('start', function () {
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
			var target = new Resource(10);
			target.on('data', function (e)
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
			var target = new Resource(10);
			target.on('end', function (e)
			{
				if (expectedCount === e) {
					isValid = true;
				}
			});
		});

		waitsFor(function () {
			return isValid;
		}, 'the end event to fire', 200);

	});	 
});