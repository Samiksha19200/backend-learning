const express=require("express")
const userModel=require("../models/user.model")
const jwt= require("jsonwebtoken")
const crypto=require("crypto")

const authRouter=express.Router()

//POST /api/auth/register
authRouter.post("/register",async (req,res)=>{

    const{name,password,email}=req.body

    const isEmailAlreadyExist= await userModel.findOne({email})

    if(isEmailAlreadyExist){
        res.status(409).json({
            message:"User already exists with this email id !"
        })
    }

    const hash=crypto.createHash("md5").update(password).digest("hex")

    const user= await userModel.create({name , password:hash, email})

    const token= jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)


    res.status(201).json({
        message:"User registered successfully",
        user,
        token
    })
})

//POST/api/auth/login
authRouter.post("/login",async(req,res)=>{

    const{email,password}=req.body
    
    const user= await userModel.findOne({email})

    if(!user){
        res.status(404).json({
            message:"User not found with this email !"
        })
    }

    const isPasswordRight= crypto.createHash("md5").update(password).digest("hex") == user.password

    if(!isPasswordRight){
        res.status(401).json({
            message:"invalid password !",
        
        })
    }

    const token= jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("jwt_token2",token)

    res.status(201).json({
        message:"user logged in successfully",
        user
    })
})



module.exports=authRouter