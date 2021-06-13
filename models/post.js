const mongoose = require('mongoose');
const config = require('../config/database');


const PostSchema = mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    authorDP: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    authorDesignation: {
        type: String,
        required: true
    },
    content_picture: {
        type: String
    },
    content_video: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String
    }],
    likes: [{
        liked_by: {
            type: String
        },
        name:{
            type:String
        },
        reaction: {
            type: String
        }
    }],
    comments: [{
        commentator_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        commentator_name: {
            type: String,
        },
        commentator_dp: {
            type: String
        },
        commentator_designation: {
            type: String 
        },
        comments_at: {
            type: Date,
            default: Date.now
        },
        comment: {
            type: String
        },
    }],
    total_views: {
        type: Number
    }

})

const Post = module.exports = mongoose.model("Post", PostSchema);


// add new Question
module.exports.addPost = function (post, callback) {
    post.save(callback);
}