const express = require('express')
const router = express.Router()
const {signUp,signIn,requireSignin} = require("../../controllers/admin/auth")
router.post('/admin/signin',signIn)

router.post('/admin/signup',signUp)

router.post('/admin/profile',requireSignin,(req,res)=>{
    res.status(200).json({
        user:"profile"
    })
})

module.exports = router