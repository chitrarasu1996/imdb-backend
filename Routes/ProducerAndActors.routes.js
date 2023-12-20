const express=require("express");
const { createProducerAndActors, getAllActorsAndProducers } = require("../controller/producerAndActors");
const router=express.Router();

 router.post("/create-producer/create-actors",createProducerAndActors)
router.get("/all-actors/all-producers",getAllActorsAndProducers)
module.exports=router