const express = require('express')
const router = express.Router()
const {signUp,signIn,requireSignin} = require("../../controllers/admin/auth")

const {validateRequest,isRequestValidated,validateSignInRequest} = require('../../validators/auth')

router.post('/admin/signin',validateSignInRequest,isRequestValidated,signIn)

router.post('/admin/signup',validateRequest,isRequestValidated,signUp)

// router.post('/admin/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:"profile"
//     })
// })

module.exports = router