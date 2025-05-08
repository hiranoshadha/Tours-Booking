const express = require("express");
const medicalConsideration = require("../controllers/medicalConsiderationController");

const medicalConsiderationRouter = express.Router();

medicalConsiderationRouter.get("/", medicalConsideration.getAllMedicalConsiderations);
medicalConsiderationRouter.get("/name/:name", medicalConsideration.getMedicalConsiderationByName);

module.exports = medicalConsiderationRouter;