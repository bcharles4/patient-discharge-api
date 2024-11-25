import mongoose from "mongoose";
import Patient from "../backend/models/patient.model.js";

export const sendNotification = async (req, res) => {
    const patients = req.body;

    if (!patients.patientID || !patients.firstName || !patients.lastName || !patients.gender ) {
        res.status(400).send("Invalid data");
        return;
    }

    const newPatient = new Patient(patients);
    try {
        await newPatient.save();
        res.status(201).json({ success: true, data: newPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }


};

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    const { id } = req.params;
    console.log(`Received ID: ${id}`); // Log the ID for debugging

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Patient ID" });
    }

    try {
        // Attempt to delete the patient by ID
        const deletedPatient = await Patient.findByIdAndDelete(id);

        // If no patient was found, return 404
        if (!deletedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Successfully deleted
        res.status(200).json({ success: true, message: "Patient deleted successfully", data: deletedPatient });
    } catch (error) {
        // If there's an error, log it and send a response
        console.error('Error deleting patient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
