const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = express.Router();
const jsonParser = require('body-parser').json();
const urlEncParser = require('body-parser').urlencoded({extended:true});
const cookieParser = require('cookie-parser');
const passport = require('passport');
const {User} = require('../model');
const strategy = require('../strategy');

router.use(morgan('common'));
router.use(jsonParser);
router.use(urlEncParser);

passport.use(strategy);
router.use(passport.initialize());
// router.use(passport.session());
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/data');
router.use(cookieParser());
router.use(express.static('public/signup'));

router.post('/', (req, res) => {
  console.log(req.body);

	if (!('username' in req.body)) {
		return res.redirect(422, './');
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
				throw {err: 'username', msg: 'Username already taken'}
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
      res.cookie('pomodoro', user._id);
			return res.redirect(`/app?${user.username}`);
		})
		.catch(err => {
      if (err.err === 'username') {
        res.redirect('/signup/?err=username');
      }
      else {
        res.status(500).json({
				  msg: 'Internal server error. Please try again later.'
        });
      }
		});
});

module.exports = router;
