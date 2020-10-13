const Category = require('../Models/category')
const slugify = require('slugify')
const dev = require('../../config/dev')
function createCategories(categories,parentId = null)
{
    const categoryList = []
    let category;
    if(parentId == null){
        category = categories.filter(cat=>cat.parentId == undefined)
    }
    else{
        category = categories.filter(cat=>cat.parentId == parentId)
    }
    for(let cat of category){
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slig:cat.slug,
            children:createCategories(categories,cat._id)
        })
    }
    return categoryList
}

exports.addCategory = (req,res)=>{
    let categoryURL;
    
    const catObj = {
        name : req.body.name,
        slug : slugify(req.body.name)
    }
    if(req.file){
        categoryURL = `${dev.API}/public/${req.file.filename}`
        catObj.categoryImage = categoryURL
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
            const categoryList = createCategories(categories)
            return res.status(200).json({
                categoryList
            })
        }
    })
}