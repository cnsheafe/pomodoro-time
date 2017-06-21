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
  console.log(`Me: ${req.cookies.pomodoro}`);
  if ('username' in req.query && 'pomodoro' in req.cookies) {
		User
			.findById(req.cookies.pomodoro)
			.exec()
			.then(user => {
				if (user.username === req.query.username) {
					res.status(200).json(user.apiRepr());
          console.log(user.apiRepr());
				}
			})
			.catch(err => {
				console.log('Either id or username is incorrect');
			});
	}
});

router.put('/', (req, res) => {
  let toUpdate = {};
  if  ('username' in req.body && 'id' in req.body) {
    ['settings', 'history'].forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  }
  User
    .findByIdAndUpdate(req.body.id, {$set: toUpdate})
    .exec()
    .then(res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;
