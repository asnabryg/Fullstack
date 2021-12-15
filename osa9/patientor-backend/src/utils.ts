import { newPatient, Gender } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): newPatient => {
    const newEntry: newPatient = {
        name: parseData(object.name),
        ssn: parseData(object.ssn),
        occupation: parseData(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender)
    };
    return newEntry;
};

const parseData = (data: unknown): string => {
    if (!data || !isString(data)) {
        throw new Error("Incorrect or missing value");
    }
    return data;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export default toNewPatient;