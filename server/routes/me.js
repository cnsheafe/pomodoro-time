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

router.get('/', (req, res) => {
  if ('username' in req.query && 'id' in req.query) {
		User
			.findById(req.query.id)
			.exec()
			.then(user => {
				if (user.username === req.query.username) {
					res.status(200).json(user.apiRepr());
				}
			})
			.catch(err => {
				console.log('Either id or username is incorrect');
			});
	}
});

module.exports = router;
