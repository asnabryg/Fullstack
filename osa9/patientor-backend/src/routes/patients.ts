import express from "express";
import patientService from "../services/patientService";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

router.post("/:id/entries", (_req, res) => {
    try {
        const patient = patientService.findById(_req.params.id);
        const newEntry = toNewEntry(_req.body);
        if (patient && newEntry) {
            const entry = patientService.addEntry(patient, newEntry);
            res.json(entry);
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        res.status(400).send(e.message);
    }
});

router.get("/:id", (_req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const patient = patientService.findById(_req.params.id);
        res.json(patient);
    } catch (error: unknown) {
        res.status(404).send("not found");
    }
});

router.post("/", (_req, res) => {
    try {
        const newPatient = toNewPatient(_req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;