const mongoose = require("mongoose");

const TranspotSchema = new mongoose.Schema({
    vehicleNo: {
        type:String,
        required:true,
    },
    vehicletype:{
        type:String,
    },
    vehiclename:{
        type:String,
    },
    seat:{
        type:String,
    },
    PriceKm:{
        type:Number,

    },
    drivername:{
        type:String,
    },
    photo:{
        type:String,
    },


});

module.exports = mongoose.model("transport",TranspotSchema);