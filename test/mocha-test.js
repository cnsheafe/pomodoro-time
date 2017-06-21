const chai = require('chai');
const chaiHttp = require('chai-http');
const {runServer, app, closeServer} = require('../server/server');
const {PORT, DUMMY_USERNAME, DUMMY_PASS} = require('../server/config');
const {User} = require('../server/model');
const passport = require('passport');
const strategy = require('../server/strategy');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('API test framework', () => {

	before(() => {return runServer(PORT);});
	after(() => {return closeServer();});

	describe('Homepage: /', () => {
		it('should return index.html at root',() => {
			return chai.request(app).get('/')
				.then(res => {
					res.should.have.status(200);
				});
		});
 	});

	describe('User account: /signup, /login, /me, /logout', function() {
		let agent = chai.request.agent(app);
		after(() => {
			return User
				.findOneAndRemove({username: DUMMY_USERNAME})
				.exec();
		});

		describe('User account creation: /signup', function() {
			it('should create an account', function() {
				return agent
					.post('/signup')
					.send({username: DUMMY_USERNAME, password: DUMMY_PASS})
					.then(res => {
						res.should.redirect;
						res.should.have.status(200);
					})
			})
		});

		describe('User login: /login', function() {
			it('should redirect and send a cookie', function() {
				return agent
					.post('/login')
					.send({username: DUMMY_USERNAME, password: DUMMY_PASS})
					.then(res => {
						expect(res).to.redirect;
						res.should.have.status(200);
					});
			})
		});

		describe('User data: /me ', function() {
			it('should be able to get user data', function() {
				return agent
					.get('/me')
					.query({'username': DUMMY_USERNAME})
					.then(res => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.a('object');
						body.should.have.all.keys('username', 'settings', 'history');
						body.settings.should.have.all.keys('work', 'break');
					});
			});
		});

		describe('User logout: /logout', function() {
			it('should clear cookies and return confirmation', function() {
				return agent
					.get('/logout')
					.then(res => {
						res.should.not.have.cookie('pomodoro');
						res.body.should.keys('msg');
					});
			});
		});
	});
});
