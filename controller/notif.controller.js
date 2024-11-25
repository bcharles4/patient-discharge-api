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