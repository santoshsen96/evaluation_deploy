const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    user:String,
    userID:String,
    device:String,
    no_of_comments:Number
},{
    versionKey:false
})

const postModel=mongoose.model("post",postSchema)

module.exports={
    postModel
}

// title ==> String
// body ==> String
// device ==> String
// no_of_comments ==> Number