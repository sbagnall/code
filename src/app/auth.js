'use strict';

var tempUsers = [
	{
		userid: 1,
		username: 'steve',
		password: 'password',
		sockets: []
	}, 
	{
		userid: 2,
		username: 'bob',
		password: 'password',
		sockets: []
	}
];

module.exports = (function () {
	var loginPage = '/public/login.html',
		isAuthorized = function (session) {
			return (session.user);
		},
		tryAuthorize = function (session, model) {
			authorize(session, model.username, model.password);
			return isAuthorized(session);
		},
		authorize = function (session, username, password) {

			return tempUsers.some(function (item) {
				if (username === item.username && password === item.password) {
					session.user = item;
					return true;
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
