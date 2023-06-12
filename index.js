const express=require('express')
const app=express()
const {connection}=require("./db")
require("dotenv").config()
// const cors=require('cors')
// app.use(cors())

app.use(express.json())
const {userRouter}=require("./routes/user.route")
 const { postRouter } = require('./routes/post.route')
app.use("/users",userRouter)
app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`running at port ${process.env.port} `)
    }catch(err){
        console.log(err)
        console.log("something went wrong")
    }

})