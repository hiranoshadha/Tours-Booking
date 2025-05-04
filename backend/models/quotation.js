const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
    quotationId: {
        type: String,
        required: true,
    },
    tour: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
        required: true,
    },
    hotel: {
        type: String,
        required: true,
    },
    guide: {
        type: String,
        required: true,
    },
    groupQuantity: {
        type: String,
        required: true,
    },
    medicalNeeds: {
        type: [String],
        required: true,
    },
    roomDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("quotation", quotationSchema);