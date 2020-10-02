const express = require('express')
const router = express.Router()
const {signUp,signIn,requireSignin} = require("../controllers/auth")
router.post('/signin',signIn)

router.post('/signup',signUp)

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})

module.exports = router