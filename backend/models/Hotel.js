const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: String,
  hotelAddress: String,
  hotelTelNo: String,
  hotelType: String,
  hotelCategory: String,
  tourArea: String,
  hotelCapacity: Number,
  roomPrice: Number,
  roomDescription: String,
  images: [String],
  amenities: Object,
  accessibility: Object
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
