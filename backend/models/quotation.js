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
        type: [String]
    },
    roomDescription: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model("quotation", quotationSchema);