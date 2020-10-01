const express = require('express')
const router = express.Router()
const User = require('../Models/user')
router.post('/signin',(req,res)=>{
    
})

router.post('/signup',(req,res)=>{

    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(user){
            res.status(400).send({
                message:"User Already Registered"
            })     
        }
    
        const {firstName,lastName,userName,email,password} = req.body
        const _user = new User({firstName,lastName,userName,email,password})
        _user.save((error,data)=>{
            if(error){
                console.log( error)
                return res.status(400).json({
                    message:"Please Try again Later"
                })
            }else{
                console.log("No error")
                return res.status(400).json({
                    user:data
                })
            }
        })
    })
})

module.exports = router