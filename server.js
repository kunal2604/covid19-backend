const APP = require('./app');
const PORT = process.env.PORT || 3000;
const HTTP = require('http');

APP.set('port', PORT);
const SERVER = HTTP.createServer(APP);

SERVER.listen(PORT);