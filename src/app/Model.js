'use strict';

var _ = require('lodash');

module.exports = Model;

function Model(request) {
	this.extra = _.extend({}, request.query, request.body, request.session);

	this.username = this.extra.username;
	this.password = this.extra.password;
} 
