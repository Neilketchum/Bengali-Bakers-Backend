const express = require('express');
const router = express.Router();
const {adminMiddleare,requireSignin} = require('../Middleware/index')
const {addCategory,getCategory} = require('../controllers/category')
router.post('/category/create',requireSignin,adminMiddleare,addCategory)
router.get('/category/getCategory',getCategory)
module.exports = router