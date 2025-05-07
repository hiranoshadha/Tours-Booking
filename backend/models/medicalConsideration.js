const mongoose = require("mongoose");

const medicalConsiderationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("medicalconsideration", medicalConsiderationSchema);