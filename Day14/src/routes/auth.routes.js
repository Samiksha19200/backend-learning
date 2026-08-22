const express = require("express")
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

//POST/api/auth/register
authRouter.post("/register", async (req, res) => {

    const { username, email, password, bio, profile_image } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "user already exists" + (isUserAlreadyExist.email == email ? "with this email id" : "with this username")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({ username, email, password: hash, bio, profile_image })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile_image: user.profile_image
    })





})

//POST/api/auth/login
authRouter.post("/login", async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found !"
        })
    }

    const isPasswordRight = user.password ==  crypto.createHash("sha256").update(password).digest("hex")

    if(!isPasswordRight){
        res.status(401).json({
            message:"invalid password!"
        })
    }

    const token= jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie('token',token)

    res.status(201).json({
        message:"user logged in successfully !",
        username:user.username,
        email:user.email,
        bio:user.bio

    })
})


module.exports = authRouter