const express = require("express");
const multer = require("multer");
const path = require("path");
const Tours = require("../models/tours");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // You can change the folder as per your requirement
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Save the file with the current timestamp and its original extension
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Multer file filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Only image files are allowed");
    }
};

// Multer upload middleware
const upload = multer({
    storage,
    fileFilter,
});

// POST route to add a new tour (with image upload)
router.post("/", upload.single('photo'), (req, res) => {
    // If a file is uploaded, save its URL to the database
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create a new tour with the uploaded file's URL
    Tours.create({
        ...req.body,
        photo: photoUrl, // Save the uploaded photo URL in the database
    })
    .then(() => res.json({ msg: "Tour Added Successfully" }))
    .catch(() => res.status(400).json({ msg: "Tour adding failed" }));
});

// GET route to fetch all tours
router.get("/", (req, res) => {
    Tours.find()
        .then((tours) => res.json(tours))
        .catch(() => res.status(400).json({ msg: "Failed to fetch tours" }));
});




router.put("/:id", async (req, res) => {
    console.log("Received update request:", req.body);
    try {
      const updatedTour = await Tours.findOneAndUpdate(
        { TourID: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedTour) {
        return res.status(404).json({ msg: "Tour not found" });
      }
      res.json({ msg: "Updated successfully", updatedTour });
    } catch (error) {
      console.error("Update error:", error.message);
      res.status(400).json({ msg: "Update failed", error: error.message });
    }
  });


  // DELETE Tour Package by TourID
  router.delete("/:id", async (req, res) => {
    const cleanId = req.params.id.trim();
    console.log("Received delete request for TourID:", cleanId);
  
    try {
      const deletedTour = await Tours.findOneAndDelete({ TourID: cleanId });
  
      if (!deletedTour) {
        return res.status(404).json({ msg: "Tour not found" });
      }
  
      res.json({ msg: "Tour deleted successfully", deletedTour });
    } catch (error) {
      console.error("Delete error:", error.message);
      res.status(500).json({ msg: "Deletion failed", error: error.message });
    }
  });
  
  
  


module.exports = router;