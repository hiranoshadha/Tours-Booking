const Quotation = require("../models/quotation");

const generateQuotationId = async () => {
    try {
        const quotationCount = await Quotation.countDocuments();
        if (!quotationCount) {
            return "Q001";
        }

        const latestDocument = await Quotation.findOne().sort({ _id: -1 });
        const lastId = latestDocument.quotationId;
        const numericPart = parseInt(lastId.substring(1));
        const nextNumericPart = numericPart + 1;
        return `Q${nextNumericPart.toString().padStart(3, '0')}`;
    } catch (error) {
        return "Q001";
    }
};

exports.createQuotation = async (req, res) => {
    try {
        const { tour, vehicle, hotel, guide, groupQuantity, medicalNeeds, roomDescription, description, totalPrice } = req.body;

        if (!tour || !vehicle || !hotel || !guide || !groupQuantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const quotationId = await generateQuotationId();
        const newQuotation = new Quotation({
            quotationId,
            tour,
            vehicle,
            hotel,
            guide,
            groupQuantity,
            medicalNeeds: medicalNeeds || [],
            roomDescription,
            description,
            totalPrice
        });

        await newQuotation.save();

        res.status(201).json({
            success: true,
            message: "Quotation created successfully",
            quotation: newQuotation,
        });
    } catch (error) {
        console.error("Error creating quotation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create quotation",
            error: error.message,
        });
    }
};

exports.getAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find();

        res.status(200).json({
            success: true,
            count: quotations.length,
            quotations
        });
    } catch (error) {
        console.error("Error fetching quotations:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch quotations",
            error: error.message,
        });
    }
};

exports.getQuotationById = async (req, res) => {
    try {
        const { quotationId } = req.params;

        const quotation = await Quotation.findOne({ quotationId });
        if (!quotation) {
            return res.status(404).json({
                success: false,
                message: "Quotation not found",
            });
        }

        res.status(200).json({
            success: true,
            quotation
        });
    } catch (error) {
        console.error("Error fetching quotation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch quotation",
            error: error.message,
        });
    }
};

exports.updateQuotation = async (req, res) => {
    try {
        const { quotationId } = req.params;
        const { tour, vehicle, hotel, guide, groupQuantity, medicalNeeds } = req.body;

        const quotation = await Quotation.findOne({ quotationId });
        if (!quotation) {
            return res.status(404).json({
                success: false,
                message: "Quotation not found",
            });
        }

        const updatedQuotation = await Quotation.findOneAndUpdate(
            { quotationId },
            {
                tour: tour || quotation.tour,
                vehicle: vehicle || quotation.vehicle,
                hotel: hotel || quotation.hotel,
                guide: guide || quotation.guide,
                groupQuantity: groupQuantity || quotation.groupQuantity,
                medicalNeeds: medicalNeeds || quotation.medicalNeeds,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Quotation updated successfully",
            quotation: updatedQuotation
        });
    } catch (error) {
        console.error("Error updating quotation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update quotation",
            error: error.message,
        });
    }
};

exports.deleteQuotation = async (req, res) => {
    try {
        const { quotationId } = req.params;

        const quotation = await Quotation.findOne({ quotationId });
        if (!quotation) {
            return res.status(404).json({
                success: false,
                message: "Quotation not found",
            });
        }

        await Quotation.findOneAndDelete({ quotationId });

        res.status(200).json({
            success: true,
            message: "Quotation deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting quotation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete quotation",
            error: error.message,
        });
    }
};
