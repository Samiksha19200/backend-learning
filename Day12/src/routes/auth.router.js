const express=require("express")
const usermodel=require("../models/user.model")
const jwt= require("jsonwebtoken")


const authRouter=express.Router()


authRouter.post("/register",async(req,res)=>{

    const{name,email,password}=req.body

    const isUserAlreadyExist=await usermodel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user already exist wit this email id"
        })
    }
    

    const user= await usermodel.create({name,email,password})

    const token=jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_cookie",token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })
})

module.exports=authRouter

