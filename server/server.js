const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const {PORT} = require('./config');
const {User} = require('./model');
const {BasicStrategy} = require('passport-http');

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use(jsonParser);

mongoose.Promise = global.Promise;
// const strategy = new BasicStrategy((username, password, callback) => {
// 	let user;
// 	User
// 		.findOne({username: username})
// 		.exec()
// 		.then(_user => {
// 			user = _user;
// 			if (!user) {
// 				return callback(null, flase, {message: 'Incorrect username'});
// 			}
// 			return user.validatePassword(password);
// 		})
// 		.then(isValid => {
// 			if (!isValid) {
// 				return callback(null, false, {message: 'Incorrect password'});
// 			}
// 			else {
// 				return callback(null, user);
// 			}
// 		})
// });
// BEGIN
// passport.use(strategy);
// app.use(passport.initialize());

mongoose.connect('mongodb://localhost/data');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//
// });
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
	if(!req.body) {
		return res.status(400).json({
			msg: "Empty request body"
		});
	}
	const credentials = req.body;
	if(!('username' in credentials)) {
		return res.status(422).json({
			msg: "No username provided"
		});
	}
	if(!('password' in credentials)) {
		return res.status(422).json({
			msg: "no password provided"
		});
	}
	User
		.findOne({username: credentials.username})
		.exec()
		.then(_user => {
			let user = _user;
			if(user.validatePassword(credentials.password)) {
				console.log('Passwords match!');
				return user;
			}
			else {
				throw "Passwords do not match"
			}
		})
		.then(
			user => {
				res.status(200).json(user.apiRepr());
			},
			err => {
				res.status(401).json({
					msg: err
				})
			}
		);
});
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
