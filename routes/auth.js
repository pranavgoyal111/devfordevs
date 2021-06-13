const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/user");


//@type    POST
//$route   /auth/register
//$desc    router for user register
//@access  private
router.post("/register",(req,res)=>{
    const newUser = new User({
        name: req.body.name,
        designation: req.body.designation,
        companyORinstitute: req.body.companyORinstitute,
        email: req.body.email,
        password: req.body.password,
        githubLink: req.body.githubLink,
        linkedinLink: req.body.linkedinLink,
        googleLink: req.body.googleLink,
        facebookLink: req.body.facebookLink,
        instagramLink: req.body.instagramLink
    });

    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        }else{
            res.json({success:true, msg:'User registered'});
        }
    })
})


//@type    POST
//$route   /auth/authenticate
//$desc    router for user authentication
//@access  private
router.post("/authenticate",(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email,(err,user)=>{
        if(err) throw err;
        if(!user){
            res.json({success: false, msg:'User not found'});
        }

        // check password
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        designation: user.designation,
                        companyORinstitute: user.companyORinstitute,
                        email: user.email,
                        dp: user.dp,
                        githubLink: user.githubLink,
                        linkedinLink: user.linkedinLink,
                        googleLink: user.googleLink,
                        facebookLink: user.facebookLink,
                        instagramLink: user.instagramLink
                    }
                })
            }else{
                return res.json({success: false, msg:'Wrong password'});
            }
        })
    })

})





module.exports = router;