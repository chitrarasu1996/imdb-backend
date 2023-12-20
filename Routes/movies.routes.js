const express=require("express")
const { createMovies, getAllMovies, getperticularmovie, updateThemoviesDetails } = require("../controller/movies-controllers")
const router=express.Router()

router.post("/create-movies",createMovies)
router.get("/get-allmovies",getAllMovies)
router.get("/getperticularmovie/:id",getperticularmovie)
router.put("/updatethemoviesdetails/:movieId",updateThemoviesDetails)
module.exports=router