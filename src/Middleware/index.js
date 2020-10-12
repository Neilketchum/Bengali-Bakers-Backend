const jwt = require('jsonwebtoken')
const key = require('../../config/dev')
exports.requireSignin = (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,key.JWTkey)
        req.user = user
        next()
    }
    else{
        return res.status(400).json({
            message:"Authorization Required"
        })
    }
    
}
exports.userMiddleware = (req,res,next)=>{
    
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message:"Access Denied"
        })       
    }
    next();
}
exports.adminMiddleare = (req,res,next)=>{
  
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message:"Access Denied"
        })       
    }
    next();
}