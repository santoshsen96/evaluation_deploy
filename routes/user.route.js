const express=require("express")
const {userModel}=require("../model/users.model")
const {auth}=require("../middleware/auth.middleware")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dataBase=[]
const blacklist=[]

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,pass,age,city,is_married}=req.body

    const existingUser = dataBase.find(user => user.email === email);
        if (existingUser) {
            return res.status(200).json({ msg: 'User already exist, please login' });
        }

    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(400).json({error:err.message})
            }else{
                const user=new userModel({name,email,gender,pass:hash,age,city,is_married})
                dataBase.push(user)
                await user.save()
                res.status(200).json({msg:"The new user has been registered",updatedUser:req.body})
            }
        });
       
       
    }catch(err){
        res.status(400).json({err:err.message})
    }

})


///login

userRouter.post("/login",async(req,res)=>{
const {email,pass}=req.body
    try{
        const user=await userModel.findOne({email})
        
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                // result == true
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},'masai')
                    res.status(200).json({msg:"Login Successfull!!",token:token})
                }else{
                    res.status(200).json({msg:"Wrong Credential!!"})
                }
            });
           
        }else{
            res.status(200).json({msg:"Wrong Credential!!"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

///logout
userRouter.get("/logout",auth,(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        blacklist.push(token)
        res.status(200).json({msg:"User has been logged out"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})



module.exports={
    userRouter
}

////name ==> String
//email ==> String
//gender ==> String
//password ==> String
//age ==> Number
//city ==> String
//is_married ==> boolean