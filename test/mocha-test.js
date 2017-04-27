const chai = require('chai');
const chaiHttp = require('chai-http');
const {runServer, app, closeServer} = require('../server');
const {PORT} = require('../config');

const should = chai.should();
chai.use(chaiHttp);


describe('API test framework', () => {

	before(() => {return runServer(PORT);});
	after(() => {return closeServer();});
	describe('GET endpoint', () => {
		it('should return index.html at root',() => {
			return chai.request(app).get('/')
			.then(res => res.should.have.status(200));
		});
	});
});
