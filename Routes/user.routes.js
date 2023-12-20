const express=require("express")
const { singInuser, login } = require("../controller/user-controller")

const router=express.Router()
router.post("/user-signIn",singInuser)
router.post("/user-login",login)
module.exports=router