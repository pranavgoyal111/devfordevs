const express = require("express");
const router = express.Router();
const config = require("../config/database");
const Question = require("../models/question");

//@type    GET
//$route   /QA/getQueAns
//$desc    router for geting all questions and answers.
//@access  private
router.get("/getQueAns",(req,res)=>{
    Question.find()
    .then(result =>{
        res.json({response:result});
    })
    .catch(err => {
        console.log(err);
        res.json({success:false,msg: "Something went wrong"});
    })
})


//@type    POST
//$route   /QA/addQuestion
//$desc    router for adding new question.
//@access  private
router.post("/addQuestion", (req, res) => {
    const newQuestion = new Question({
        authorName: req.body.authorName,
        authorDesignation: req.body.authorDesignation,
        authorPicture: req.body.authorPicture,
        authorId: req.body.authorId,
        question: req.body.question,
        description: req.body.description,
        tags: req.body.tags
    })

    Question.addQuestion(newQuestion, (err, Question) => {
        if (err) {
            console.log(err)
            res.json({
                success: false,
                msg: 'Question added failed!'
            });
        } else {
            res.json({
                success: true,
                msg: 'Question added successfully.'
            });
        }
    })
})

//@type    POST
//$route   /QA/addAnswer
//$desc    router for adding new answer.
//@access  private
router.post("/addAnswer", (req, res) => {

    const questionId = req.body.questionId;
    const newAnswer = {
        userName: req.body.userName,
        userDesignation: req.body.userDesignation,
        userPicture: req.body.userPicture,
        answer: req.body.answer
    }

    Question.findByIdAndUpdate(questionId, {
            $push: {
                answers: newAnswer
            }
        }, {
            upsert: true
        })
        .then((user) => {
            res.json({
                success: true,
                msg: 'Answer added successfully.'
            });

        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'Answer added failed.'
            });
        })

});

//@type    POST
//$route   /QA/increaseView
//$desc    router for answer increase view.
//@access  private
router.post("/increaseView", (req, res) => {

    const question_id = req.body.question_id;
    Question.findByIdAndUpdate(question_id, {
        $inc: {
            'total_views': 1
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) res.json({
            success: false
        });
        res.json({
            success: true
        });
    })
})

//@type    POST
//$route   /QA/increaseFavourtie
//$desc    router for answer increase view.
//@access  private
router.post("/increaseFavourtie", (req, res) => {

    const question_id = req.body.question_id;
    Question.findByIdAndUpdate(question_id, {
        $inc: {
            'favourties': 1
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) res.json({
            success: false
        });
        res.json({
            success: true
        });
    })
})



//@type    POST
//$route   /QA/answerLike
//$desc    router for answer Like.
//@access  private
router.post("/answerLike", (req, res) => {

    const answer_id = req.body.answer_id;
    const reaction_by = req.body.reaction_by;
    const reaction = req.body.reaction;

    if (reaction == "like") {
        Question.findOne({
                'answers._id': answer_id,
                'answers.like': reaction_by
            })
            .then(like => {
                if (like)
                {
                     // Like push start
                     Question.findOneAndUpdate({
                        'answers._id': answer_id
                    }, {
                        $pull: {
                            'answers.$.like': reaction_by
                        }
                    }, {
                        upsert: true
                    })
                    .then(user => {
                        res.json({
                            success: true,
                            msg: 'Remove from liked answer'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: "Failed"
                        });
                    }) // Like push end here
                }
                    
                else {

                    // check user already dislike
                    Question.findOne({
                            'answers._id': answer_id,
                            'answers.dislike': reaction_by
                        })
                        .then(user => {
                            if (user) {
                                // Dislike pull here
                                Question.findOneAndUpdate({
                                        'answers._id': answer_id
                                    }, {
                                        $pull: {
                                            'answers.$.dislike': reaction_by
                                        }
                                    }, {
                                        upsert: true
                                    })
                                    .then(user => {
                                        // Like push start
                                        Question.findOneAndUpdate({
                                                'answers._id': answer_id
                                            }, {
                                                $push: {
                                                    'answers.$.like': reaction_by
                                                }
                                            }, {
                                                upsert: true
                                            })
                                            .then(user => {
                                              
                                                res.json({
                                                    success: true,
                                                    msg: "You like this answer"
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                res.json({
                                                    success: false,
                                                    msg: "Failed"
                                                });
                                            }) // Like push end here
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            msg: "Failed"
                                        });
                                    })

                            } else {
                                // Like push start
                                Question.findOneAndUpdate({
                                        'answers._id': answer_id
                                    }, {
                                        $push: {
                                            'answers.$.like': reaction_by
                                        }
                                    }, {
                                        upsert: true
                                    })
                                    .then(user => {
                                       
                                        res.json({
                                            success: true,
                                            msg: "You like this answer"
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            msg: "Failed"
                                        });
                                    }) // Like push end here
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false
                });
            })
    } else if (reaction == "dislike") {

        // check dislike already exits or not
        Question.findOne({
                'answers._id': answer_id,
                'answers.dislike': reaction_by
            })
            .then(user => {
                if (user)
                {
                    // Dislike pull start here
                    Question.findOneAndUpdate({
                        'answers._id': answer_id
                    }, {
                        $pull: {
                            'answers.$.dislike': reaction_by
                        }
                    }, {
                        upsert: true
                    })
                    .then(user => {
                       
                        res.json({
                            success: true,
                            msg: 'Dislike removed'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: "Failed"
                        });
                    }) // Dislike pull end here
                }
                    
                else {
                    // Now check dislike present in like or not
                    Question.findOne({
                            'answers._id': answer_id,
                            'answers.like': reaction_by
                        })
                        .then(user => {
                            if (user) {
                                // first remove from like then update dislike
                                Question.findOneAndUpdate({
                                        'answers._id': answer_id
                                    }, {
                                        $pull: {
                                            'answers.$.like': reaction_by
                                        }
                                    }, {
                                        upsert: true
                                    })
                                    .then(user => {
                                        // Dislike push start here
                                        Question.findOneAndUpdate({
                                                'answers._id': answer_id
                                            }, {
                                                $push: {
                                                    'answers.$.dislike': reaction_by
                                                }
                                            }, {
                                                upsert: true
                                            })
                                            .then(user => {
                                              
                                                res.json({
                                                    success: true,
                                                    msg: "You dislike this answer"
                                                });
                                            })
                                            .catch(err => {
                                               
                                                res.json({
                                                    success: false,
                                                    msg: "Failed"
                                                });
                                            }) // Dislike end here
                                    })
                                    .catch(err => {
                                        res.json({
                                            success: false,
                                            msg: "Failed"
                                        });
                                    })
                            } else {
                                // Dislike push start here
                                Question.findOneAndUpdate({
                                        'answers._id': answer_id
                                    }, {
                                        $push: {
                                            'answers.$.dislike': reaction_by
                                        }
                                    }, {
                                        upsert: true
                                    })
                                    .then(user => {
                                      
                                        res.json({
                                            success: true,
                                            msg: "You dislike this answer"
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            msg: "Failed"
                                        });
                                    }) // Dislike end here
                            }
                        })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    msg: "Failed"
                });
            })
    }

})


module.exports = router;