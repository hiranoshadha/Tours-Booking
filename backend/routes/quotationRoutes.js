const express = require("express");
const quotationController = require("../controllers/quotationController");

const quotationRouter = express.Router();

quotationRouter.post("/", quotationController.createQuotation);
quotationRouter.get("/", quotationController.getAllQuotations);
quotationRouter.get("/:quotationId", quotationController.getQuotationById);
quotationRouter.put("/:quotationId", quotationController.updateQuotation);
quotationRouter.delete("/:quotationId", quotationController.deleteQuotation);

module.exports = quotationRouter;