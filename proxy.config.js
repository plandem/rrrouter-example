'use strict';
var user;

module.exports = {
	'POST /auth/login': function (req, res) {
		try {
			var response = JSON.parse(req.body);
			var sid = Math.random().toString();
			sid = sid.substring(2, sid.length);

			user = { username: response.username, id: sid };

			//not working! :(
			// res.set("Set-Cookie", "auth-token=" + sid + "; path=/");

			res.status(200);
		} catch(error) {
			res.status(503);
		}

		res.end();
	},

	'/auth/user': function(req, res) {
		// console.log(req.headers);
		// console.log('cookie=', req.headers.cookie);
		// console.log(sessions);

		if(user) {
			res.status(200);
			res.json({ user });
		} else {
			//let's delay response to show nice 'loading' screen
			setInterval(function() {
				res.status(401);
				res.end();
			}, 1500);
		}
	}
};
