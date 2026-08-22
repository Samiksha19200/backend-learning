const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"This username already exists !"],
        required:[true,"Username is required !"]
    },
    email:{
        type:String,
        unique:[true,"This email already exists !"],
        required:[true,"Email is required !"]
    },
    password:{
        type:String,
        required:[true,"Password is required !"]
    },
    bio:String,
    profile_image:{
        type:String,
        default:"https://ik.imagekit.io/c32r0eu9f/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel