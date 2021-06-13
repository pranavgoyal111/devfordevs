const mongoose = require('mongoose');
const config = require("../config/database");
const Schema = mongoose.Schema

const questionSchema = mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    authorDesignation: {
        type: String,
        required: true
    },
    authorPicture: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    createdAt: {
        type : Date, 
        default: Date.now
    },
    tags: [{
        type: String
    }], 
    answers: [{
        userName: {
            type: String,
            required: true,
        },
        userDesignation: {
            type: String,
            required: true
        },
        userPicture: {
            type: String,
            required: true
        },
        answer :{
            type: String,
            required: true
        },
        like: [{
            type: String
        }],
        dislike: [{
            type: String
        }],
        answerRepliedAt: {
            type : Date, 
            default: Date.now
        },
    }],
    total_views: {
        type: Number
    },
    favourties: {
        type: Number 
    }
})

const Question = module.exports = mongoose.model("Question",questionSchema);

// find by question
module.exports.findByQuestion = function(question,callback){
    const query = {question: question};
    Question.findOne(query,callback);
}

// add new Question
module.exports.addQuestion = function (question,callback) {
    question.save(callback);
}







