const JWT =require("jsonwebtoken")
const moviesCollection=require("../models/movies.model")
const userCollection=require("../models/user.model")
exports.createMovies=async(req,res)=>{
    try {
const {token}=req.headers
const isverified=await JWT.verify(token,process.env.SECRET_KEY)
if(!isverified){
   return  res.status(200).send({result:false,message:"token is not valid"})
}

        const {movieName, yearOfRelease, actors,producer}=req.body

        const  releasedYear=parseInt(yearOfRelease, 10)

        if (!movieName || !releasedYear|| !actors || !producer) {
            return res.status(200).send({ result: false, message: "Missing required fields" });
        }
        
        const oldMovie=await moviesCollection.findOne({movieName:movieName.toLowerCase()})
       
        if(oldMovie){
            return res.status(200).send({result:false,message:`${oldMovie.movieName} movie name already exist`})
        }

        const store=await  new moviesCollection({
            movieName,
            yearOfRelease:releasedYear,
            actors,
            producer
        }).save()
      if(!store){
        return res.status(500).status({result:false,message:"error while storing movies"})
      }
      res.status(201).send({result:true,message:"movie succefully stored"})

    } catch (error) {
        console.log(error)
    }
}

exports.getAllMovies=async(req,res)=>{
    try{
const allMovies=await moviesCollection.find({})
.populate('producer',"producerName")
.populate("actors","actorsName" )
res.status(200).send({message:"allmovies successfully retrive",allMovies})


    }catch(error){
        console.log(error)
        res.status(500).send({result:true,message:"internal server error"})
    }
}
exports.getperticularmovie=async(req,res)=>{
    try {
        const {id}=req.params
        const singleMovieDetails=await moviesCollection
        .findOne({_id:id})
        .populate('producer',"producerName")
        .populate("actors","actorsName" )

        if(!singleMovieDetails){
return res.status(404).send({result:false,message:"error while getting the movie"})
        }
        res.status(200).send({result:true,message:"single movie retrived",singleMovieDetails})
    } catch (error) {
        console.log(error)
    }
}

exports.updateThemoviesDetails=async(req,res)=>{
    try {
        const {token}=req.headers
        const {movieId}=req.params

        const validToken=await JWT.verify(token,process.env.SECRET_KEY)

if(!validToken) res.status(200).send({result:false,message:"token not valid please login"})
const validUser=await userCollection.findOne({email:validToken.email})
   
if(!validUser) res.status(200).send({result:false,message:"user doent exist kindly register"})

const {movieName,yearOfRelease,actors,producer}=req.body

const updated=await moviesCollection.findByIdAndUpdate({_id:movieId},{$set:{
    movieName,
    yearOfRelease,
    actors,
    producer

}})
if(!updated) res.status(400).send({result:false,message:"getting error while updating details "})

res.status(201).send({result:true,message:"movie successfully updated"})


    } catch (error) {
         console.log(error)
    }
}