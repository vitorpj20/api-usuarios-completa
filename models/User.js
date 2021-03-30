import mongoose from "mongoose"

const User = mongoose.Schema({
    name:String,
    city:String,
    age:Number,
    profession:String,
    img:String,
    nameImage:String,
    size:Number,
    key:String,
    url:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const UserModel = mongoose.model("Users",User)

export default UserModel