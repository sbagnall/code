'use strict';

var DataAccess = require('./DataAccess'),
	da = new DataAccess();

module.exports = (function () {
	var loginPage = '/public/login.html',
		isAuthorized = function (session) {
			return ((typeof session.user !== 'undefined') && (session.user !== null));
		},
		tryAuthorize = function (session, model, cb) {
			authorize(session, model.username, model.password, function () {
				var isAuth = isAuthorized(session);
				cb((isAuth ? null : 'not authorized'), isAuth);
			});
		},
		authorize = function (session, username, password, cb) {
			da.open(function (err) {

				if (err) {
					cb(err);
				} else {
					da.findUser(username, password, function (err, user) {
						if (err) {
							cb(err);
						} else {
							session.user = user;
							cb();
						}
					});
				}
			});
		},
		isAuthenticateAttempt = function (model) {
			return model.username && model.password;
		};

	return {
		loginPage: loginPage,
		isAuthorized: isAuthorized,
		tryAuthorize: tryAuthorize,
		isAuthenticateAttempt: isAuthenticateAttempt
	};
})();
