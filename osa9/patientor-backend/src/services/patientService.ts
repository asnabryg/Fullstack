import patients from "../../data/patients.json";
import { NewPatient, Patient, PublicPatient } from "../types";
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

export default {
    getPatients,
    addPatient,
    findById
};