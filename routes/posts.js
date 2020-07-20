const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const Post = require('../models/post');

ROUTER.post('', (req, res, next) => {
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

ROUTER.get('', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        // 200 --> everything OK
        res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
        });
    });
});

ROUTER.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    })
});

ROUTER.delete("/:id", (req, res, next) => {
    console.log('Deleting -> ', req.params.id);
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Post deleted!" });
        });
    
});

// APP.put() -> To put new resource and completely replace the old one
// APP.patch() -> To only update existing resource with new value
ROUTER.put("/:id", (req, res, next) => {
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

module.exports = ROUTER;