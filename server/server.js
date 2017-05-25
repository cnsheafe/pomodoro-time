const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const {PORT} = require('./config');
const {User} = require('./model');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use(jsonParser);

mongoose.Promise = global.Promise;

passport.use(
	new LocalStrategy (
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
	})
);

// passport.use(strategy);
app.use(passport.initialize());
mongoose.connect('mongodb://localhost/data');
let server;

app.post('/signup', (req, res) => {
	if (!req.body) {
		return res.status(400).json({message: "Empty Request body"});
	}
	if (!('username' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: username'
		});
	}

	if (!('password' in req.body)) {
		return res.status(422).json({
			message: 'Missing field: password'
		});
	}
	const credentials = req.body;
	return User
		.find({username: credentials.username})
		.count()
		.exec()
		.then(count => {
			if (count > 0) {
				res.status(422).json({
					message: 'username already taken'
				});
				throw "Username taken"
			}
			return User.hashPassword(credentials.password);
		}, null)
		.then(hash => {
			return User.create({
				username: credentials.username,
				password: hash,
				settings: {
					work: 25,
					break: 5
				}
			});
		}, null)
		.then(user => {
			return res.status(201).json(user.apiRepr());
		})
		.catch(err => {
			res.status(500).json({
				msg: 'Internal server error'
			})
		});
});

app.post('/login', (req, res) => {
	passport.authenticate('local',
	data => {
		if(data.valid) {
			const user = data.user;
			res.status(200).json({
				username: user.username,
				settings: user.settings,
				history: user.history
			});
		}
		else {
			res.status(422).json({msg: data.msg})
		}
	})(req, res);
	}
);

function runServer(port=PORT) {
	return new Promise((resolve, reject) => {
		server = app.listen(port, () => {
			console.log(`App is listening on port ${port}`);
			resolve();
		}).on('error', err => reject(err));
	});
}

function closeServer() {
 server.close(err => {
	 if(!err) { console.log('Closed server'); }
 });
}

if (require.main === module) { runServer().catch(err => console.error(err)); }

module.exports = {runServer, app, closeServer};
