// test.spec.js
describe('test1 module', function() {
	it('is defined', function() {
		var target = require('../app/test1.js');

		expect(target).toBeDefined();
	});

	it('exposes method do', function() {
		var target = require('../app/test1.js');
		var expected = 'badger';
		var actual = target.do();

		expect(expected).toEqual(actual);	
	});
});
