
const producerCollection = require("../models/Producers.model");
const actorsCollection = require("../models/actors.model");
exports.createProducerAndActors = async (req, res) => {
  try {
    const { producer, actors } = req.body;

    const oldProducer = await producerCollection.findOne({
      producerName: producer.toLowerCase(),
    });

    const oldActor = await actorsCollection.findOne({ actorsName: actors.toLowerCase() });



    if (oldActor || oldProducer) {
      return res.status(200).send({ result: false, message: "Actor or producer already exists" });
    }
    let actorStored;
    let producerStored;
if(actors){
   actorStored = await new actorsCollection({ actorsName: actors }).save();
}else if(producer){
   producerStored = await new producerCollection({ producerName: producer }).save();
}
   

if(!actorStored&&!producerStored){
    return res.status(200).send({message:"error while storing actorName or producers name"})
}
    res.status(201).send({result:true, message: "User and actor successfully stored" });
  } catch (error) {
    console.error(error);

    // Check the type of error and send an appropriate response
    if (error.code === 11000) {
      // Duplicate key error (E11000)
      return res.status(400).send({ result: false, message: "Duplicate key error. Actor or producer already exists." });
    }

    // Other internal server errors
    res.status(500).send({ result: false, message: "Internal server error" });
  }
};

exports.getAllActorsAndProducers=async(req,res)=>{
    try {
        const allProducer=await producerCollection.find({})
       
        const allActorsName=await actorsCollection.find({})


        res.status(200).send({result:true,message:"all producers and actors succefully retrived",allProducer,allActorsName})
        } catch (error) {
         console.log(error)
    }
}