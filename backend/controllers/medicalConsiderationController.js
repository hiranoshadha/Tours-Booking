const MedicalConsideration = require("../models/medicalConsideration");

exports.getAllMedicalConsiderations = async (req, res) => {
    try {
        const medicalConsideration = await MedicalConsideration.find();

        res.status(200).json({
            success: true,
            medicalConsideration
        });
    } catch (error) {
        console.error("Error fetching medicalConsideration:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch medicalConsideration",
            error: error.message,
        });
    }
};

exports.getMedicalConsiderationByName = async (req, res) => {
    try {
        const { name } = req.params;
        console.log(name)
        const medicalConsideration = await MedicalConsideration.findOne({ name });
        console.log(medicalConsideration)

        if (!medicalConsideration) {
            return res.status(404).json({
                success: false,
                message: "medicalConsideration not found",
            });
        }

        res.status(200).json({
            success: true,
            medicalConsideration
        });
    } catch (error) {
        console.error("Error fetching medicalConsideration:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch medicalConsideration",
            error: error.message,
        });
    }
};

exports.insertHardCodedMedicalConsiderations = async (req, res) => {
    try {
        const hardCodedConsiderations = [
            {
                name: "Diabetes",
                description: "Requires regular insulin monitoring and dietary restrictions",
                riskLevel: "Medium",
                recommendations: ["Regular blood sugar testing", "Carry insulin", "Avoid excessive sugar intake"]
            },
            {
                name: "Hypertension",
                description: "High blood pressure condition requiring monitoring",
                riskLevel: "Medium",
                recommendations: ["Regular blood pressure checks", "Avoid excessive salt", "Take prescribed medication"]
            },
            {
                name: "Asthma",
                description: "Respiratory condition that may be triggered by environmental factors",
                riskLevel: "Medium",
                recommendations: ["Carry inhaler", "Avoid known triggers", "Check air quality before outdoor activities"]
            },
            {
                name: "Heart Condition",
                description: "Cardiovascular issues requiring special attention",
                riskLevel: "High",
                recommendations: ["Avoid strenuous activities", "Regular medication", "Access to medical facilities"]
            },
            {
                name: "Pregnancy",
                description: "Special considerations for expectant mothers",
                riskLevel: "Medium",
                recommendations: ["Avoid high-altitude locations", "Regular rest periods", "Access to medical facilities"]
            }
        ];

        // Insert the hard-coded data
        const insertedConsiderations = await MedicalConsideration.insertMany(hardCodedConsiderations);

        res.status(201).json({
            success: true,
            message: "Hard-coded medical considerations inserted successfully",
            count: insertedConsiderations.length,
            data: insertedConsiderations
        });
    } catch (error) {
        console.error("Error inserting medical considerations:", error);
        res.status(500).json({
            success: false,
            message: "Failed to insert medical considerations",
            error: error.message,
        });
    }
};
