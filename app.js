const EXPRESS = require('express');
const APP = EXPRESS();
const Post = require('./models/post');
const MONGOOSE = require('mongoose');

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

APP.post('/api/posts', (req, res, next) => {
    const POST = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(POST);
    POST.save();
    // 201 --> everything OK, a new resource was created
    res.status(201).json({
        message: 'Post added successfully'
    });
});

APP.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        // 200 --> everything OK
        res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
        });
    });
});

APP.delete("/api/posts/:id", (req, res, next) => {
    console.log(req.params.id);
    res.status(200).json({ message: " Post deleted! "});
});

module.exports = APP;  