const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userScheme = new mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        trim:true
    },
    lastName : {
        type:String,
        required:true,
        trim:true
    },
    userName : {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    contactNumber:{
        type:String,

    },
    profilePicture:{
        type:String
    },
},{timestamps:true})

userScheme.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password,6)
})
userScheme.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})
userScheme.methods  = {
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password)
    }
}

module.exports = mongoose.model("User",userScheme);