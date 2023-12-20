const mongoose=require("mongoose");

const producerSchema=mongoose.Schema({
    producerName:{
        type:String,
        required:true,
        unique:true
    }  

})
module.exports=mongoose.model("producers",producerSchema)
