const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = express.Router();
const jsonParser = require('body-parser').json();
const urlEncParser = require('body-parser').urlencoded({extended:true});
const passport = require('passport');
const {User} = require('../model');
const strategy = require('../strategy');

router.use(morgan('common'));
router.use(jsonParser);
router.use(urlEncParser);

passport.use(strategy);
router.use(passport.initialize());
router.use(passport.session());
mongoose.Promise = global.Promise;

router.use(express.static('public/signup'));

router.post('/', (req, res) => {
  console.log(req.body);
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
});

module.exports = router;
