const {check,validationResult}  = require('express-validator')
exports.validateRequest = [
    check('firstName').notEmpty().withMessage('First Name is required'),
    check('lastName').notEmpty().withMessage('Last Name is required'),
    check('email').notEmpty().withMessage('Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be atleast 6 charecters long'),
]
exports.validateSignInRequest = [
    
    check('email').notEmpty().withMessage('Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be atleast 6 charecters long'),
]
exports.isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array.length > 1){
        console.log(errors.array.length)
        res.status(400).json({
            message:errors
        })
    }else{
        console.log("HI")
        next()
    }
}