'use strict';

module.exports = (function () {
	var isAuthorized = function (session) {
			return (session.username);
		},
		tryAuthorize = function (session, model) {
			if (authorize(model.username, model.password)) {
				session.username = model.username;
			}
			return isAuthorized(session);
		},
		authorize = function (username, password) {
			if (username === 'a' && password === 'b') {
				return true;
			} else {
				return false;
			}
		},
		isAuthenticateAttempt = function (model) {
			return model.username && model.password;
		};

	return {
		isAuthorized: isAuthorized,
		tryAuthorize: tryAuthorize,
		isAuthenticateAttempt: isAuthenticateAttempt
	};
})();
