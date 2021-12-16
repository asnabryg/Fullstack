import { NewPatient, Gender, NewEntry, Entry, BaseEntry } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseData(object.name),
        ssn: parseData(object.ssn),
        occupation: parseData(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        entries: []
    };
    return newPatient;
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

export const toNewEntry = (newEntry: any): NewEntry => {
    const entry = parseEntry(newEntry);
    const newDiagnosisEntry: Omit<BaseEntry, "id"> = {
        date: parseDate(entry.date),
        description: parseData(entry.description),
        specialist: parseData(entry.specialist)
    };
    switch (entry.type) {
        case "Hospital":
            return {
                ...newDiagnosisEntry,
                type: entry.type,
                discharge: parseDischarge(entry.discharge)
            };
        case "HealthCheck":
            return {
                ...newDiagnosisEntry,
                type: entry.type,
                healthCheckRating: parseHealthRate(entry.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                ...newDiagnosisEntry,
                type: entry.type,
                sickLeave: parseSickleaves(entry.sickLeave),
                employerName: parseData(entry.employerName)
            };
        default:
            return assertNever(entry);
    }
};

const parseSickleaves = (sickleave: any): {startDate: string, endDate: string} => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (!sickleave) return sickleave;

    if (!sickleave.startDate || !sickleave.endDate) {
        throw new Error('Sickleave date missing');
    }

    const startDate = parseDate(sickleave.startDate);
    const endDate = parseDate(sickleave.endDate);

    return {
        startDate,
        endDate
    };
};

const parseHealthRate = (rate: number): number => {
    if (!rate || !Number.isInteger(rate)) {
        throw new Error("Invalid rate value: " + rate);
    }
    return rate;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntry = (entry: any): NewEntry => {
    if (!entry || !isEntryType(entry)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error("Incorrect entry type: " + Object.values(entry));
    }
    return entry;
};

const parseDischarge = (discharge: { date: string, criteria: string }): {date: string, criteria: string} => {
    if (!discharge.date || !isDate(discharge.date)) {
        throw new Error('Invalid date of discharge');
    }
    if (!discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Invalid criteria of discharge');
    }
    return discharge;
};

const isEntryType = (entry: any): entry is Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return ["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(entry.type);
};

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default toNewPatient;