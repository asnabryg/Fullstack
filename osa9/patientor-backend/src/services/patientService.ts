import patients from "../../data/patients";
import { NewEntry, NewPatient, Patient, PublicPatient, Entry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id, name, dateOfBirth, gender, occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    let patient = patients.find(p => p.id === id);
    if (patient && !patient.entries) {
        patient = {
            ...patient,
            entries: []
        };
    }
    return patient;
};

const addPatient = (patient: NewPatient): NewPatient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
    const entry: Entry = {
        ...newEntry,
        id: uuid()
    };
    patient.entries.push(entry);
    return entry;
};

export default {
    getPatients,
    addPatient,
    findById,
    addEntry
};