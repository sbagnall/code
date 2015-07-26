'use strict';

var client = require('mongodb').MongoClient,
	constants = require('../shared/constants'),
	DEFAULT_CONNECTION = 'mongodb://localhost:27017/' + constants.appName;

module.exports = DataAccess;

function DataAccess (connectionString) {
	this.connectionString = connectionString || DEFAULT_CONNECTION;
	this.db = null;
}

DataAccess.prototype.open = function (cb) {
	client.connect(this.connectionString, function (err, db) {
		if (err) {
			console.log('unable to connect to database: ' + err);
			cb(err);
		} else {
			this.db = db;
			console.log('connected to: ' + this.connectionString);
			cb();
		}
	}.bind(this));
};

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

DataAccess.prototype.save = function (uname, pword, cb) {
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

DataAccess.prototype.saveLocalConfig = function (user, data, cb) {
	this.getCollection('localConfig', function (err, collection) {
		if (err) {
			cb(err);
		} else {
			collection.save({_id: user._id, data: data},
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

DataAccess.prototype.loadLocalConfig = function (user, cb) {
	this.getCollection('localConfig', function (err, collection) {
		if (err) {
			cb(err);
		} else {
			collection.findOne({_id: user._id},
				function (err, result) {
					if (err) {
						cb(err);
					} else {
						cb(null, (result ? result.data : null));
					}
				});
		}
	});
};