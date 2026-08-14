const express = require('express')
const app = express()
const noteModel = require("./models/note.model")

app.use(express.json())

//POST/ api/notes
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

//GET/api/notes
app.get("/api/notes", async(req, res) => {
    const note = await noteModel.find()

    res.status(200).json({
        message:"note fetched successfully",
        note
    })
})

//DELETE/api/notes/:id
app.delete("/api/notes/:id",async (req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message:"note deleted successfully"
    })
})

//PATCH/api/notes/:id
app.patch("/api/notes/:id",async (req,res)=>{
    const{description}= req.body

    await noteModel.findByIdAndUpdate(req.params.id,{description})

    res.status(202).json({
        message:"note updated successfully"
    })
})



module.exports = app

