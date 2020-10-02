const express = require('express')
const app = express();
const env = require("dotenv")
const bodyParser = require('body-parser')
// env.config();
const mongoose = require('mongoose')
const userRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin/auth")

app.use(bodyParser());
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
app.use('/api',adminRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Process",PORT)
}) 