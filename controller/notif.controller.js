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
    const { patientID } = req.params; // Extract patientID from the request parameters
    console.log(`Received Patient ID: ${patientID}`); // Log the patientID for debugging

    try {
        // Attempt to delete the patient by their patientID
        const deletedPatient = await Patient.findOneAndDelete({ patientID: patientID });

        // If no patient was found, return 404
        if (!deletedPatient) {
            return res.status(404).json({ 
                success: false, 
                message: "Patient not found with the given Patient ID" 
            });
        }

        // Successfully deleted
        res.status(200).json({ 
            success: true, 
            message: "Patient deleted successfully", 
            data: deletedPatient 
        });
    } catch (error) {
        // If there's an error, log it and send a response
        console.error('Error deleting patient:', error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while deleting the patient", 
            error: error.message 
        });
    }
};
