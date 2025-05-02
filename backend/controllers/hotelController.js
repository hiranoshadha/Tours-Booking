const Hotel = require('../models/Hotel');

// Add new hotel
exports.createHotel = async (req, res) => {
  try {
    // Check if files exist, otherwise set an empty array for images
    const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Create a new hotel document
    const newHotel = new Hotel({
      ...req.body,
      images: imagePaths,
      amenities: JSON.parse(req.body.amenities),
      accessibility: JSON.parse(req.body.accessibility)
    });

    // Save the new hotel document to the database
    await newHotel.save();
    res.status(201).json({ message: 'Hotel added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    // Fetch all hotels from the database
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    // Find hotel by ID
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update hotel by ID
exports.updateHotel = async (req, res) => {
  try {
    // Find hotel by ID
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

    // If no new files are uploaded, retain the existing images
    let imagePaths = hotel.images;
    if (req.files && req.files.length > 0) {
      // Update image paths if new files are uploaded
      imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Update hotel document with new data
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: imagePaths,
        amenities: JSON.parse(req.body.amenities),
        accessibility: JSON.parse(req.body.accessibility)
      },
      { new: true } // Return the updated hotel document
    );

    res.json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete hotel
exports.deleteHotel = async (req, res) => {
  try {
    // Find hotel by ID and delete
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
