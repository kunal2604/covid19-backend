const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const BCRYPT = require('bcrypt');
const JWT = require('jsonwebtoken');

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

ROUTER.post('/login', (req,res,next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                res.status(401).json({
                    message: "Authentication failed !!"
                });
            } 
            fetchedUser = user;
            return BCRYPT.compare(req.body.password, user.password)
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Authentication failed !!"
                });
            }
            const TOKEN = JWT.sign( 
                { email: fetchedUser.email, userId: fetchedUser._id }, 
                'covid19_secret', 
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: TOKEN
            });
        })
        .catch(err => {
            res.status(401).json({
                message: "Authentication failed !!"
            });
        })
});
module.exports = ROUTER;