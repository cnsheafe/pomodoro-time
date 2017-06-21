const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const urlEncParser = require('body-parser').urlencoded({extended: true});
const cookieParser = require('cookie-parser');
const passport = require('passport');
const {PORT, DATABASE_URL} = require('./config');
const {User} = require('./model');
const strategy = require('./strategy');
const routerSignup = require('./routes/signup');
const routerLogin = require('./routes/login');
const routerMe = require('./routes/me');
const routerLogout = require('./routes/logout');

const app = express();
app.use(morgan('common'));
app.use(jsonParser);
app.use(urlEncParser);
app.use(cookieParser());

app.use(express.static('public'));
app.use('/signup', routerSignup);
app.use('/login', routerLogin);
app.use('/me', routerMe);
app.use('/logout', routerLogout);
passport.use(strategy);
app.use(passport.initialize());

let server; //used if server is called for testing
mongoose.connect(DATABASE_URL);
// mongoose.connect('mongodb://localhost/data');


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
