const mongoose = require('mongoose');
const config = require('../config/database');


const userPostSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    video: {
        type: String
    },
    content: {
        type: String
    },
    tags: [{
        type: String
    }],
    likes: [{
        liked_by: {
            type: String
        },
        reactions: {
            type: String
         }
    }],
    comments: [{
        author_id: {
            type: String
        },
        auther_name: {
            type: String,
        },
        comment:{
            type: String
        },
        comment_likes: [{
            comment_liked_by: {
                type: String
            },
            comment_reactions: {
                type: Array
             }
        }],   
    }],
    total_views:{
        type: Number
    }

})

const Post = module.exports = mongoose.model("userPost",userPostSchema);