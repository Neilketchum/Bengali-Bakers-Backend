const express = require('express')
const router = express.Router();
const {requireSignin,userMiddleware}  = require('../Middleware/index')
const {addToCart} = require('../controllers/cart')
router.post('/user/cart/addtocart',requireSignin,userMiddleware,addToCart);
module.exports = router;