const express = require('express');
const multer = require('multer');
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.post('/', upload.array('images', 10), createHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.put('/:id', upload.array('images', 10), updateHotel);
router.delete('/:id', deleteHotel);

module.exports = router;
