var http = require('http');

const SERVER = http.createServer((req, res) => {
    res.end('This is my first response');
});

SERVER.listen(process.env.PORT || 3000)  