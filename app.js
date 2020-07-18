const EXPRESS = require('express');

const APP = EXPRESS();

APP.use((req, res, next) => {
    console.log('First middleware')/
    next();
});

APP.use((req, res, next) => {
    res.send('Hello from Ecpress');
});

module.exports = APP;  