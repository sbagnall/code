'use strict';

var client = require('mongodb').MongoClient,
	constants = require('../shared/constants'),
	DEFAULT_CONNECTION = 'mongodb://localhost:27017/' + constants.appName;

module.exports = DataAccess;

function DataAccess (connectionString) {
	this.connectionString = connectionString || DEFAULT_CONNECTION;
	this.db = null;

	client.connect(this.connectionString, function (err, db) {
		if (err !== null) {
			console.log('unable to connect to database: ' + err);
			return;
		}

		this.db = db;

		console.log('connected to: ' + this.connectionString);

	}.bind(this));
}

DataAccess.prototype.getCollection = function (collection, cb) {
	this.db.collection(collection, function (err, docCollection) {
		if (err) {
			cb(err);
		} else {
			cb(null, docCollection);
		}
	});
};

DataAccess.prototype.findUser = function (uname, pword, cb) {
	this.getCollection('users', function (err, collection) {
		if (err) {
			cb(err);
		} else {
			collection.findOne({username: uname, password: pword}, 
				function (err, result) {
					if (err) {
						cb(err);
					} else {
						cb(null, result);
					}
				});
		}
	});
};