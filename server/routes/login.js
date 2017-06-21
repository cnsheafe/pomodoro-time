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
router.use(cookieParser());
passport.use(strategy);
router.use(passport.initialize());
mongoose.Promise = global.Promise;

router.use(express.static('public/login'));

router.post('/', (req, res) => {
  console.log(req.body);
  passport.authenticate('local',
	data => {
    console.log('auth', data);
		if(data.valid) {
			const user = data.user;
      // console.log(user._id);
      res.cookie('pomodoro', `${user._id}`);
      res.redirect(`/?${user.username}`);
		}
		else {
			res.status(422).json({msg: data.msg})
		}
	})(req, res);
});

module.exports = router;
