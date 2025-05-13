const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const guideR= require("./routes/g")
const tourRoutes = require("./routes/tours");
const transportRoutes = require("./routes/transport");
const hotelRoutes = require("./routes/Hotel"); // Hotel routes
const medicalConsiderationRouter = require("./routes/medicalConsiderationRoute");
const quotationRouter = require("./routes/quotationRoutes");
const PORT = 3000;

const app = express();


// CORS configuration
app.use(cors({ origin: true, credentials: true }));

// Database Connection
dbconnection();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/uploads", express.static("uploads"));



// Routes
app.use("/api/tours", tourRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/guide", guideR);
app.use("/api/quotation", quotationRouter);
app.use("/api/medicalconsideration", medicalConsiderationRouter);
app.use("/api/hotels", hotelRoutes); // Hotel routes



// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
app.get("/",(req,res)=> res.send("HELLOW WORLD"));


app.use(express.json());


