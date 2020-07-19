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
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

APP.post('/api/posts', (req, res, next) => {
    const POST = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(POST);
    POST.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    })
    // 201 --> everything OK, a new resource was created
    
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

APP.get('/api/posts/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    })
});

APP.delete("/api/posts/:id", (req, res, next) => {
    console.log('Deleting -> ', req.params.id);
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Post deleted!" });
        });
    
});

// APP.put() -> To put new resource and completely replace the old one
// APP.patch() -> To only update existing resource with new value
APP.put("/api/posts/:id", (req, res, next) => {
    const POST = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, POST)
        .then(result => {
            res.status(200).json({ message: "Update successful"});
        });
});

module.exports = APP;  