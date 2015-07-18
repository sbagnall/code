'use strict';

module.exports = (function () {
	var isAuthorized = function (session) {
			return (session.username && session.password);
		},
		tryAuthorize = function (session, model) {
			if (model.username && model.password) {
				session.username = model.username;
				session.password = model.password;
			}

			return isAuthorized(session);
		};

	return {
		isAuthorized: isAuthorized,
		tryAuthorize: tryAuthorize
	};
})();
