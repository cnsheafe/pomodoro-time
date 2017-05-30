const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const urlEncParser = require('body-parser').urlencoded({extended: true});
const passport = require('passport');
const {PORT} = require('./config');
const {User} = require('./model');
const strategy = require('./strategy');
const routerSignup = require('./routes/signup');
const routerLogin = require('./routes/login');
const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use('/signup', routerSignup);
app.use('/login', routerLogin);

let server; //used if server is called for testing
mongoose.connect('mongodb://localhost/data');
// app.post('/login', (req, res) => {
// 	passport.authenticate('local',
// 	data => {
// 		if(data.valid) {
// 			const user = data.user;
// 			res.status(200).json({
// 				username: user.username,
// 				settings: user.settings,
// 				history: user.history
// 			});
// 		}
// 		else {
// 			res.status(422).json({msg: data.msg})
// 		}
// 	})(req, res);
// 	}
// );

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
