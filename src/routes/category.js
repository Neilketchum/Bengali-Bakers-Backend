const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const shortId = require("shortid")
const {adminMiddleare,requireSignin} = require('../Middleware/index')
const {addCategory,getCategory} = require('../controllers/category')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate()+'-'+file.originalname)
    }
 })
 var upload = multer({ storage: storage })
router.post('/category/create',requireSignin,adminMiddleare,upload.single('categoryImage'),addCategory)
router.get('/category/getCategory',getCategory)
module.exports = router