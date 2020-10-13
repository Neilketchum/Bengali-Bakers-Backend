const express = require('express')
const app = express();
const env = require("dotenv")
const bodyParser = require('body-parser')
// env.config();
const mongoose = require('mongoose')
const userRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin/auth")
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const path = require('path')
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')))
mongoose.connect('mongodb+srv://neil:123@cluster0.krfbl.mongodb.net/<dbname>?retryWrites=true&w=majority',{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
}).then((req,res)=>{
    if(req){
        console.log("Connected")
    }else{
        console.log("rejected")
    }
})
app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Process",PORT)
}) 