const mongoose = require("mongoose");

function connecttoDB(){
    mongoose.connect("process.env.MODEL_URI")
    .then(()=>{
        console.log("connected to database");
        
    })
}

module.exports= connecttoDB