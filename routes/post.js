const express = require("express");
const router = express.Router();
const Post = require("../models/post");


router.post("/adp", (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    const newPost = new Post({
        authorId: req.body.authorId,
        authorDP: req.body.authorDP,
        authorName: req.body.authorName,
        authorDesignation: req.body.authorDesignation,
        content_picture: req.body.content_picture,
        content_video: req.body.content_video,
        content: req.body.content,
        tags: req.body.tags
    })

    var file = req.files.file;
    var img_name = file.name;

    var content_picture = "../../../assets/posts/" + Date.now() + file.name;

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
        file.mv('client/src/assets/posts/' + Date.now() + file.name)
        res.json({
            success: true
        });
    }
})


//@type    GET
//$route   /post/getPosts
//$desc    router for geting all posts.
//@access  private
router.get("/getPosts", (req, res) => {
    Post.find()
        .then(result => {
            res.json({
                response: result
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                msg: "Something went wrong"
            });
        })
})


//@type    POST
//$route   /post/addPost
//$desc    router for new post.
//@access  private
router.post('/addPost', (req, res) => {
    var file = req.files.file;
    var content_picture = "";
    if (req.files) {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            content_picture = "../../../assets/posts/"+ file.name;
        }
    }



    const newPost = new Post({
        authorId: req.body.authorId,
        authorDP: req.body.authorDP,
        authorName: req.body.authorName,
        authorDesignation: req.body.authorDesignation,
        content_picture: content_picture,
        content_video: req.body.content_video,
        content: req.body.content,
        tags: req.body.tags
    })

    Post.addPost(newPost, (err, posts) => {
        if (err) {
            console.log(err)
            res.json({
                success: false,
                msg: 'Something went wrong, Try again later'
            });
        } else {
            file.mv('client/src/assets/posts/'+ file.name)
            res.json({
                success: true,
                msg: 'Post added successfully.'
            });
        }
    })
})

//@type    POST
//$route   /post/addComment
//$desc    router for new post's comment.
//@access  private
router.post("/addComment", (req, res) => {
    const postId = req.body.postId;

    const newComment = {
        commentator_id: req.body.commentator_id,
        commentator_name: req.body.commentator_name,
        commentator_dp: req.body.commentator_dp,
        commentator_designation: req.body.commentator_designation,
        comment: req.body.comment
    }

    Post.findByIdAndUpdate(postId, {
            $push: {
                comments: newComment
            }
        }, {
            upsert: true
        })
        .then((user) => {
            res.json({
                success: true,
                msg: 'Comment added successfully.'
            });

        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'Comment added failed!'
            });
        })

})

//@type    POST
//$route   /post/addLike
//$desc    router for post's like.
//@access  private
router.post("/addLike", (req, res) => {

    const postId = req.body.postId;

    const newLike = {
        liked_by: req.body.liked_by,
        name: req.body.name,
        reaction: req.body.reaction
    }

    Post.findOne({
            '_id': postId,
            'likes.liked_by': req.body.liked_by
        })
        .then(posts => {
            if (posts) {
                Post.findOneAndUpdate({
                        '_id': postId,
                        'likes.liked_by': req.body.liked_by
                    }, {
                        "likes.$.reaction": req.body.reaction
                    })
                    .then(posts => {
                        res.json({
                            success: true,
                            msg: "You " + req.body.reaction + " this post."
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            success: false,
                            msg: "something went wrong!please do somthing"
                        })
                    })

            } else {
                Post.findByIdAndUpdate(postId, {
                        $push: {
                            likes: newLike
                        }
                    }, {
                        upsert: true
                    })
                    .then((posts) => {
                        res.json({
                            success: true,
                            msg: "You " + req.body.reaction + " this post."
                        });

                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: 'Something went wrong!'
                        });
                    })
            }
        })



})








module.exports = router;