
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
   },
   description:{
       type:String,
       required:true,
       trim:true
   },
   offers:{
       type:Number,
    },
    productPics:[
        {
            img:{
                type:String
            }
        }
    ],
    quantity:{
        type:Number,
        required:true
    },
    reviews:[{
        userId:{
                type:mongoose.Schema.Types.ObjectId,ref:'User',//Foreign Key
        },review:{
           type:String
        }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'//Foreign Key
    },
    updatedAt:Date,
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:'Category'
    }
},{timestamps:true})
module.exports  = mongoose.model('Product',productSchema)