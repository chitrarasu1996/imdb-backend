const mongoose = require("mongoose");

const moviesListsSchema = mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        unique: true,
    },
    yearOfRelease: {
        type: Number,
        required: true,
    },
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actors',
            required:true
        }
    ],

    image:{
        type:String,
        required:true
    },

    producer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producers',
        required: true,
    },

});

module.exports = mongoose.model("moviesCollection", moviesListsSchema);
