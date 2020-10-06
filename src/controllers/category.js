const Category = require('../Models/category')
const slugify = require('slugify')
exports.addCategory = (req,res)=>{
    const catObj = {
        name : req.body.name,
        slug : slugify(req.body.name)
    }
    if(req.body.parentId){
        catObj.parentId = req.body.parentId
    }
    const cat = new Category(catObj);
    cat.save((error,cat)=>{
        if(error){
            return res.status(400).json({
                message:error
            })
        }if(cat){
            return res.status(201).json({
                message:"Success"
            })
        }
    })
}
exports.getCategory  = (req,res)=>{
    Category.find({}).exec((error,categories)=>{
        if(error){
            return res.status(400).json({
                message:error
            })
        }if(categories){
            return res.status(200).json({
                categories
            })
        }
    })
}