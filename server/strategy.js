const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./model');

const strategy =	new LocalStrategy (
	(username, password, callback) => {
		User
			.findOne({username: username})
			.exec()
			.then(user => {
				if (!(user.validatePassword(password))) {
					return callback({
						valid: false,
						msg: 'incorrect password'
					});
				}
				else {
					return callback({
					valid: true,
					user: user
					});
				}
			})
			.catch(err => {
				return callback({
					valid: false,
					msg: 'incorrect username'}
				);
			})
	}
);

module.exports = strategy;
