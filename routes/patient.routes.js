import express from "express";
import { sendNotification, getPatients, deletePatient} from "../controller/notif.controller.js"; // Ensure the file extension is correct

const router = express.Router();


router.get("/", getPatients);
router.post("/send-notification", sendNotification);
router.delete("/:patientID", deletePatient);


export default router;