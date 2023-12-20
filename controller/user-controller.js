const bcrypt=require("bcrypt")
const users=require("../models/user.model")
const jwt=require("jsonwebtoken")

exports.singInuser=async(req,res)=>{
    try {
        const {password,userName,email}=req.body
        const oldUSer=await users.findOne({email})
        if(oldUSer){
            return res.status(200).send({result:false,message:"user already exist"})
        }
        const hasedPass=await bcrypt.hash(password,12)
if(hasedPass){
const isValid=await new users({password:hasedPass,userName,email}).save()
isValid ?res.status(201).send({result:true,message:"user singed succefully"}):
res.status(500).send({ result:false,message: "Error creating user" });
}     
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body
    
        if(!email){
           return res.status(200).send({ result:false,message:"email is mandetoy"})
        }

        const oldUSer=await users.findOne({email})
if(!oldUSer){
   return res.status(200).send({ result:false,message:"please enter valid email"})
}
const isvalidPass=await bcrypt.compare(password,oldUSer.password)
if(!isvalidPass){
   return  res.status(200).send({ result:false,message:"user password doen't match"})
}
const token=await jwt.sign({email},process.env.SECRET_KEY,{expiresIn:"1w"})
res.status(201).send({ result:true,message:"user successfully logged",token})

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" });
    }
}