const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const BCRYPT = require('bcrypt');

const User = require('../models/user');

ROUTER.post('/signup', (req, res, next) => {
    BCRYPT.hash(req.body.password, 10)
        .then(hash => {
            const USER = new User({
                email: req.body.email,
                password: hash
            });
            USER.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'User created!',
                        result: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        errorSignup: err
                    });
                });
        });  
});

module.exports = ROUTER;