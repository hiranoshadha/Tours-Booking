const mongoose = require("mongoose");

const TourScema = new mongoose.Schema({
    TourID:{
        type : String,
        required :true
    },
    name:{
        type:String,
    },
    destination:{
        type:Array,
    },
    days:{
        type:Number,
    },
    Kmrs:{
        type:Number,
    },
    photo:{
        type:String,
    }
});
module.exports = mongoose.model("Tour",TourScema);