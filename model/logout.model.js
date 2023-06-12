const mongoose=require("mongoose")

const logoutSchema=mongoose.Schema({
   token:String
},{
    versionKey:false
})

const logoutModel=mongoose.model("blacklist",logoutSchema)

module.exports={
    logoutModel
}

////name ==> String
//email ==> String
//gender ==> String
//password ==> String
//age ==> Number
//city ==> String
//is_married ==> boolean