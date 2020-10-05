const express = require('express')
const router = express.Router()
const {signUp,signIn,requireSignin} = require("../controllers/auth")
const {validateRequest,isRequestValidated,validateSignInRequest} = require('../validators/auth')

router.post('/signin',validateSignInRequest,isRequestValidated,signIn)

router.post('/signup',validateRequest,isRequestValidated,signUp)

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})

module.exports = router