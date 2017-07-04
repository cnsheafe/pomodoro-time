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

mongoose.Promise = global.Promise;
router.use(cookieParser());
router.use(express.static('public/signup'));

router.post('/', (req, res) => {
  console.log(req.body);

	if (!('username' in req.body)) {
    return res.status(401).json({
      msg: 'Missing field: username'
    })
	}

	if (!('password' in req.body)) {
		return res.status(422).json({
			msg: 'Missing field: password'
		});
	}
	const credentials = req.body;
	return User
		.findOne({username: credentials.username})
		.count()
		.exec()
		.then(count => {
			if (count > 0) {
        console.log(`Counts: ${count}`);
				throw {err: 'username', msg: 'Username already taken'}
			}
			return User.hashPassword(credentials.password);
		}, null)
    .then(hash => {
      console.log('hashed');
			return User.create({
				username: credentials.username,
				password: hash,
				settings: {
					work: 25,
					break: 5
				}
			});
		})
		.then(user => {
      res.cookie('pomodoro', user._id);
      res.status(201).json({redirectTo: `/app?${user.username}`})
		})
		.catch(err => {
      if (err.err === 'username') {
        res.status(401).json({
          msg: err.msg
        })
      }
      else {
        res.status(500).json({
				  msg: 'Internal server error. Please try again later.'
        });
      }
		});
});

module.exports = router;
