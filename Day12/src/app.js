const express=require("express")
const app=express()
const authRouter=require("./routes/auth.router")
const cookieparser= require("cookie-parser")
app.use(cookieparser())

app.use(express.json())

app.use("/api/auth",authRouter)

module.exports=app