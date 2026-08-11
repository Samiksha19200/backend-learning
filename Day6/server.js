const app= require("./src/app")


const mongoose=require("mongoose")

function connecttodb(){
    mongoose.connect("mongodb+srv://samiksha:k07CxBtH4Nb7954d@cluster0.wprlabt.mongodb.net/Day6")
    .then(()=>{
        console.log("connected to database")
    })
}
connecttodb()







app.listen(3000,()=>{
    console.log("server is started at port 3000");
})