require("dotenv").config()
const express=require("express")
const cors=require("cors")

const app=express();

const db=require("./db/connnect")
const PORT=4000
const users=require("./Routes/user.routes")
const moviesRoutes=require("./Routes/movies.routes")
const producerAndActorsRoutes=require("./Routes/ProducerAndActors.routes")
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use("/users",users)
app.use("/movies",moviesRoutes)
app.use("/producers-actors",producerAndActorsRoutes)
db()
app.get("/",(req,res)=>{
res.status(200).send({message:"IMDB TASK"})
})
app.listen(PORT,()=>{
    console.log(`port is running ${PORT}`)
})
