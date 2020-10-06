const express = require('express')
const router = express.Router()
const {signUp,signIn} = require("../controllers/auth")
const {validateRequest,isRequestValidated,validateSignInRequest} = require('../validators/auth')
const {requireSignin} = require('../Middleware/index')
router.post('/signin',validateSignInRequest,isRequestValidated,signIn)

router.post('/signup',validateRequest,isRequestValidated,signUp)

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})

module.exports = router