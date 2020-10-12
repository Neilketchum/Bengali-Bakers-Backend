const Product = require('../Models/product')
const slugify = require('slugify')
const shortId = require('shortid')
exports.addProduct = (req,res,next) =>{
    const prodObj = {
        name:req.body.name,
        slug:slugify(req.body.name),
        price:req.body.price,
        description:req.body.description,   
        category:req.body.category,
        quantity :req.body.quantity
    }
    if(req.body.offers){
        prodObj.offers = req.body.offers
    }
    // if(req.body.reviews){
    //     prodObj.reviews = req.body.reviews
    // }
    let productPictures = []
    if(req.files.length > 0){
         req.files.map(file=>{
            productPictures.push({img:file.filename})
        })
    }
    prodObj.productPictures = productPictures;
    const prod = new Product(prodObj)
    prod.save((err,product)=>{
        if(err){
            return res.status(401).json({
                err
            })
        }else{
            res.status(200).json(product)
        }
    })
}