import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({ 
    doctorsID: { type: String, required: false },
    patientID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true},
    contact: { type: String, required: false },
    status: { type: String, required: false, default: "Ready for Discharged" },
},{
    timestamps: true,
});


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;