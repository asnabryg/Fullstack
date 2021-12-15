import patients from "../../data/patients.json";
import { newPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Omit<Patient, "ssn">[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (patient: newPatient): newPatient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};