import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

router.post("/", (_req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, ssn, dateOfBirth, occupation, gender } = _req.body;
    const newPatient = patientService.addPatient({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender
    });
    res.json(newPatient);
});

export default router;