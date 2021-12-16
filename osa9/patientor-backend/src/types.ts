
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}


export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
    male = "male",
    female = "female"
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export interface BaseEntry {
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis["code"]>
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: {
        date: string,
        criteria: string
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export enum HealthCheckRating {
    'Healthy' = 1,
    'LowRisk' = 2,
    'HighRisk' = 3,
    'CriticalRisk' = 4
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck',
    healthCheckRating: HealthCheckRating;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewEntry =
    | Omit<HospitalEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>
    | Omit<HealthCheckEntry, 'id'>;