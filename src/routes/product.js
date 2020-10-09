const express = require('express')

const router = express.Router()

const { requireSignin, adminMiddleare } = require('../Middleware/index')

const { addProduct } = require('../controllers/Product')

const multer   = require("multer")

const path = require('path')

const shortId = require("shortid")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate()+'-'+file.originalname+Date.now()+'.jpeg')
    }
})
   

var upload = multer({ storage:storage })
router.post('/product/create', requireSignin, adminMiddleare,upload.array('productPic'), addProduct)



module.exports = router