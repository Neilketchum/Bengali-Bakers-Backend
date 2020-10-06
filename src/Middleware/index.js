const jwt = require('jsonwebtoken')
const key = require('../../config/dev')
exports.requireSignin = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    
    const user = jwt.verify(token,key.JWTkey)
    req.user = user
    next()
}