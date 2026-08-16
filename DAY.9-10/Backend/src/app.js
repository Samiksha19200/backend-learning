const express = require("express")
const app = express()
const noteModel = require("./models/note.model")
const cors=require("cors")
const path=require("path")

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


//POST//api/notes
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note=await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })

})

//GET/api/notes
app.get("/api/notes",async(req,res)=>{
    const note=await noteModel.find()

    res.status(200).json({
        message:"note fetched successfully",
        note
    })

})

//DELETE/api/notes
app.delete("/api/notes/:id",async(req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id)

    res.status(201).json({
        message:"note deleted successfully"
    })
})

//PATCH/api/notes
app.patch("/api/notes/:id",async(req,res)=>{

    const{description}=req.body

    await noteModel.findByIdAndUpdate(req.params.id,{description})

    res.status(201).json({
        message:"updated successfully"
    })
})
console.log(__dirname)
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})



module.exports = app