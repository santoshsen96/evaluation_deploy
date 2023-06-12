const express=require("express")
const {postModel}=require("../model/post.model")
const {auth}=require("../middleware/auth.middleware")

const postRouter=express.Router()
postRouter.use(auth)

postRouter.post("/add",async(req,res)=>{
    try{
        const note=new postModel(req.body)
        await note.save()
        res.json({msg:"new note added",note:req.body})
    }catch(err){
        res.json({error:err.message})
    }
})

postRouter.get("/",async(req,res)=>{
    try{
        const notes=await postModel.find({userID:req.body.userID})
        res.send(notes)
    }catch(err){
        res.json({error:err.message})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {postID} = req.params
    try{
        const post=await postModel.findOne({_id:postID})
        const userIDinPostDoc=post.userID
        if(userIDinUserDoc===userIDinPostDoc){
            await postModel.findByIdAndUpdate({_id:postID},req.body)
            res.json({msg:`${post.title} has updated`})
        }else{
            res.json({msg:"Not authorized"})
        }

    }catch(err){
        res.json({error:err})
    }
    
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {postID} = req.params
    try{
        const post=await postModel.findOne({_id:postID})
        const userIDinPostDoc=post.userID
        if(userIDinUserDoc===userIDinPostDoc){
            await postModel.findByIdAndDelete({_id:postID})
            res.json({msg:`${note.title} has deleted`})
        }else{
            res.json({msg:"Not authorized"})
        }

    }catch(err){
        res.json({msg:"deleted"})
    }
})

module.exports={
    postRouter
}