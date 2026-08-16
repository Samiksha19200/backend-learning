const mongoose=require("mongoose")

function connectedtoDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to db");
    })
}

module.exports=connectedtoDB