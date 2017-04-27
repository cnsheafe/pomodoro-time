const express = require('express');
const morgan = require('morgan');
const {PORT} = require('./config');
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

let server;

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
