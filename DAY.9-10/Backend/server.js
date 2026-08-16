require("dotenv").config()
const app=require("./src/app")
const connectedtoDB=require("./src/config/database")

connectedtoDB()

app.listen(3000,()=>{
    console.log("server is running at 3000");
})