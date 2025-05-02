const express = require("express");
const router = express.Router();
const Guide = require("../models/guide");


/*
router.post("/",(req, res)=> {
    console.log(res.body);
    guide.create(res.body)
    .then(()=>res.json({msg:"Tour Guide added Succesfully"}))
    .catch((err)=> {
        console.error("error adding tour guide details:",err);  
        res.status(400).json({msg:"Tour Guide adding Failed",error:err.message });
    });
});
*/

router.post('/', async (req, res) => {  
    const { tourGuideID, name, Contact, language, experience, charges, photo } = req.body;

    try {
        const guide = new Guide({
            tourGuideID,
            name,
            Contact, // Ensure it matches your schema field name
            language,
            experience,
            charges,
            photo
        });

        await guide.save();
        res.status(201).json(guide);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});
  

router.get("/", (req, res) => {
    Guide.find()
        .then((guide) => res.json(guide))
        .catch(() => res.status(400).json({ msg: "No guide found" }));
});

router.get("/:id", (req, res) => {
    Guide
        .findById(req.params.id)
        .then((foundGuide) => res.json(foundGuide))
        .catch(() => res.status(400).json({ msg: "Cannot find this Guide" }));
});

router.put("/:id", (req, res) => {
    Guide.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.json({ msg: "Update Successfully" }))
        .catch(() => res.status(400).json({ msg: "Update Failed" }));
});


router.delete("/:id", (req, res) => {
    Guide.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted Succesfully" }))
        .catch(() => res.status(400).json({ msg: "Cannot bo Deleted" }));
});

module.exports = router;
