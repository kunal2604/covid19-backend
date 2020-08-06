const EXPRESS = require('express');
const APP = EXPRESS();
const MONGOOSE = require('mongoose');

const POST_ROUTES = require('./routes/posts');
const USER_ROUTES = require('./routes/user');

const MONGO_SERVER = "mongodb+srv://kunal2604:PyeFWckO3UWFSQ1f@cluster2604.u09yn.mongodb.net/covid19?retryWrites=true&w=majority";

MONGOOSE.connect(
    MONGO_SERVER,
    { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use("/images", EXPRESS.static('images'));

APP.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

APP.use('/api/posts', POST_ROUTES);
APP.use('/api/user', USER_ROUTES);

module.exports = APP;  