const mongoose=require("mongoose")
const actorsShema=mongoose.Schema(
    {
    actorsName: {
        type:String,
        required:true,
        unique:true
    },

}
)
module.exports=mongoose.model("actors",actorsShema)