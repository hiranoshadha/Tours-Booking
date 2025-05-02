const express = require("express");
const router = express.Router();
const transport = require("../models/transport");

// Test route
router.get("/test", (req, res) => res.send("Transport routes working"));

// Add new transport details
router.post("/", (req, res) => {
    transport.create(req.body)
        .then(() => res.json({ msg: "Transport details added successfully" }))
        .catch((err) => {
            console.error("Error adding transport details:", err);  // Log the error
            res.status(400).json({ msg: "Details addition failed", error: err.message });
        });
});

router .get("/",(req,res)=>{
    transport.find().then((transport)=>res.json(transport))
    .catch((err)=>res.status(400).json({msg:"No transport details found"}));
});

router.get("/:id",(req,res) => {
    transport
        .findById(req.params.id)
        .then((transport)=>res.json(transport))
        .catch(()=>res.status(400).json({msg:"cannot find this details"}));

});

router.put("/:id",(req,res)=>{
    transport.findByIdAndUpdate(req.params.id,req.body).then(()=>
      res.json({msg:"update succesfully"}).catch(()=>res.status(400).json({msg:"update failed"}))
);
});

router.delete("/:id",(req,res)=>{
    transport.findByIdAndDelete(req.params.id).then(()=>
      res.json({msg:"delete succesfuly"})
     .catch(()=>res.status(400).json({msg:"delete failed"})));
});

module.exports = router;
