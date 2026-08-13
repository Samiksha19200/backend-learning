const express=require("express")
const app=express()
const noteModel = require("./models/notemodel")

app.use(express.json())

//POST/notes
app.post("/notes",async (req,res)=>{
    const{title,description}=req.body

    const note=await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"note created successfully",
        note

    })
})

//GET/notes

app.get("/notes",async (req,res)=>{
    const note=await noteModel.find()

    res.status(200).json({
        message:"note fetched successfully",
        note
    })
})


module.exports=app