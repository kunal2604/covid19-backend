const EXPRESS = require('express');

const APP = EXPRESS();

APP.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
APP.use('/api/posts', (req, res, next) => {
    const POSTS = [
        {
            id: "fadf234hj",
            title: "First dummy post from server",
            content: "Hello. This is coming from the backend. But this is purely dummy data"
        },
        {
            id: "kjhk24",
            title: "Second dummy post from server",
            content: "Hello again!! Thiis is also dummy data"
        }
    ]
     res.status(200).json({
         message: 'Posts fetched successfully!',
         posts: POSTS
     });
});

module.exports = APP;  