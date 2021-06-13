const express = require('express');
const router = express.Router()
const config = require("../config/database");
const User = require("../models/user");

//@type    GET
//$route   /developers/getAll
//$desc    router for getting All Developers.
//@access  private
router.get("/getAll",(req,res)=>{
    User.find()
    .then(result =>{
        res.json({response:result});
    })
    .catch(err => {
        console.log(err);
        res.json({success:false,msg: "Something went wrong"});
    })
})

//@type    POST
//$route   /developers/getAllFollowings
//$desc    router for getting All Developers.
//@access  private
router.post("/getAllFollowings",(req,res)=>{
    const id = req.body.id;
    User.findById(id)
    .then(result =>{
        res.json({response:result.following});
    })
    .catch(err => {
        console.log(err);
        res.json({success:false,msg: "Something went wrong"});
    })
})



//@type    POST
//$route   /developers/follow
//$desc    router for adding new question.
//@access  private
router.post("/follow",(req,res)=>{
    const followingId = req.body.followingId;
    const ownId = req.body.ownId;


    User.findByIdAndUpdate(ownId,{
        $push: {
            following: followingId
        }
    }, {
        upsert: true
    })
    .then((user) => {
        User.findByIdAndUpdate(followingId,{
            $push: {
                followers: ownId
            }
        }, {
            upsert: true
        })
        .then((user) => {
            res.json({
                success: true,
                msg: 'Success.'
            });

        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'Something went wrong.'
            });
        })

    })
    .catch((err) => {
        console.log(err);
        res.json({
            success: false,
            msg: 'Something went wrong.'
        });
    })
})


//@type    POST
//$route   /developers/followRemove
//$desc    router for adding new question.
//@access  private
router.post("/followRemove",(req,res)=>{
    const followingId = req.body.followingId;
    const ownId = req.body.ownId;


    User.findByIdAndUpdate(ownId,{
        $pull: {
            following: followingId
        }
    }, {
        upsert: true
    })
    .then((user) => {
        User.findByIdAndUpdate(followingId,{
            $pull: {
                followers: ownId
            }
        }, {
            upsert: true
        })
        .then((user) => {
            res.json({
                success: true,
                msg: 'Success.'
            });

        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'Something went wrong.'
            });
        })

    })
    .catch((err) => {
        console.log(err);
        res.json({
            success: false,
            msg: 'Something went wrong.'
        });
    })
})









module.exports = router;