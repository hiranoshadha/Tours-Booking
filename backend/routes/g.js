const express = require("express");
const router = express.Router();
const Guide = require("../models/guide");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in an 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

const upload = multer({ storage: storage });


// Create the uploads folder if it doesn't exist
const fs = require("fs");
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



// POST route to add a new guide with file upload
router.post("/", upload.single("photo"), async (req, res) => {
  const { tourGuideID, name, Contact, language, experience, charges } = req.body;

  try {
    const guide = new Guide({
      tourGuideID,
      name,
      Contact,
      language: language ? language.split(",").map((lang) => lang.trim()) : [],
      experience,
      charges,
      photo: req.file ? `/uploads/${req.file.filename}` : "", // Store the file path
    });

    await guide.save();
    res.status(201).json(guide);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET all guides
router.get("/", (req, res) => {
  Guide.find()
    .then((guide) => res.json(guide))
    .catch(() => res.status(400).json({ msg: "No guide found" }));
});

// GET a single guide by ID
router.get("/:id", (req, res) => {
  Guide.findById(req.params.id)
    .then((foundGuide) => res.json(foundGuide))
    .catch(() => res.status(400).json({ msg: "Cannot find this Guide" }));
});

// PUT route to update a guide with file upload
router.put("/:id", upload.single("photo"), async (req, res) => {
  const { tourGuideID, name, Contact, language, experience, charges } = req.body;

  try {
    const updateData = {
      tourGuideID,
      name,
      Contact,
      language: language ? language.split(",").map((lang) => lang.trim()) : [],
      experience,
      charges,
    };

    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`; // Update photo if a new file is uploaded
    }

    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json({ msg: "Update Successfully", guide: updatedGuide });
  } catch (err) {
    res.status(400).json({ msg: "Update Failed", error: err.message });
  }
});

// DELETE a guide
router.delete("/:id", (req, res) => {
  Guide.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Deleted Successfully" }))
    .catch(() => res.status(400).json({ msg: "Cannot be Deleted" }));
});

module.exports = router;