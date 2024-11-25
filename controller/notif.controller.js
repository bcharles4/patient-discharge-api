import mongoose from "mongoose";
import Patient from "../backend/models/patient.model.js";

// Send Notification
export const sendNotification = async (req, res) => {
    const patients = req.body;

    if (!patients.patientID || !patients.firstName || !patients.lastName || !patients.gender) {
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

// Get All Patients
export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Patient
export const deletePatient = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Patient ID" });
    }

    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);

        if (!deletedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, message: "Patient deleted successfully", data: deletedPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
