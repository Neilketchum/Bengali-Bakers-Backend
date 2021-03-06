const User = require('../Models/user')
const jwt = require('jsonwebtoken')
const key = require('../../config/dev')
exports.signUp = (req,res)=>{
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
                    message:"User Created Succesfully"
                })
            }
        })
    })
}
exports.signIn = (req,res) =>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error)
            return res.status(400).json({
                message:"Please Try Again"
            })
        console.log(req.body)
        if(user.authenticate(req.body.password) && user.role === 'user'){
            const token = jwt.sign({_id:user._id,role:user.role},key.JWTkey,{expiresIn:'1h'});
            const {firstName,lastName,userName,email,role,fullName,_id} = user;
            res.status(200).json({
                token,
                user:{
                    firstName,lastName,userName,email,role,fullName,_id
                }
            });
        }else{
            return res.status(400).json({
                message:"Incorrect Password"
            })
        }
    })
}
