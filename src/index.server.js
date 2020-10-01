const express = require('express')
const app = express();
const env = require("dotenv")
const bodyParser = require('body-parser')
// env.config();
const mongoose = require('mongoose')
const userRoutes = require("./routes/user")

app.use(bodyParser());
mongoose.connect('mongodb+srv://neil:123@cluster0.krfbl.mongodb.net/<dbname>?retryWrites=true&w=majority').then((req,res)=>{
    if(req){
        console.log("Connected")
    }else{
        console.log("rejected")
    }
})
app.use('/api',userRoutes);
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Process",PORT)
}) 