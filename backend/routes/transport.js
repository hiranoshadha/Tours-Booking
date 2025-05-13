const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const transport = require("../models/transport");

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using current timestamp
  }
});

// Multer middleware to handle file upload
const upload = multer({
  storage: storage,
}).single('photo'); // 'photo' corresponds to the form field for the image

// Test route
router.get("/test", (req, res) => res.send("Transport routes working"));

// Add new transport details with file upload
router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: "File upload failed", error: err.message });
    }

    const newTransport = new transport({
      vehicleNo: req.body.vehicleNo,
      vehicletype: req.body.vehicletype,
      vehiclename: req.body.vehiclename,
      seat: req.body.seat,
      PriceKm: req.body.PriceKm,
      drivername: req.body.drivername,
      photo: req.file ? req.file.path : "", // Save the file path in the database
    });

    newTransport.save()
      .then(() => res.json({ msg: "Transport details added successfully" }))
      .catch((err) => {
        console.error("Error adding transport details:", err);  // Log the error
        res.status(400).json({ msg: "Details addition failed", error: err.message });
      });
  });
});

// Get all transport details
router.get("/", (req, res) => {
  transport.find().then((transports) => res.json(transports))
    .catch((err) => res.status(400).json({ msg: "No transport details found" }));
});

// Get transport details by ID
router.get("/:id", (req, res) => {
  transport.findById(req.params.id)
    .then((transport) => res.json(transport))
    .catch(() => res.status(400).json({ msg: "Cannot find this detail" }));
});

// Update transport details by ID with file upload
router.put("/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: "File upload failed", error: err.message });
    }

    // Check if the file was uploaded and update the photo field
    const updatedTransport = {
      vehicleNo: req.body.vehicleNo,
      vehicletype: req.body.vehicletype,
      vehiclename: req.body.vehiclename,
      seat: req.body.seat,
      PriceKm: req.body.PriceKm,
      drivername: req.body.drivername,
      // If there's a new file, update the photo, otherwise keep the old photo path
      photo: req.file ? req.file.path : req.body.photo,  // Keep the existing photo if not updated
    };

    transport.findByIdAndUpdate(req.params.id, updatedTransport)
      .then(() => res.json({ msg: "Update successful" }))
      .catch(() => res.status(400).json({ msg: "Update failed" }));
  });
});

// Delete transport details by ID
router.delete("/:id", (req, res) => {
  transport.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Delete successful" }))
    .catch(() => res.status(400).json({ msg: "Delete failed" }));
});

module.exports = router;
