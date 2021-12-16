/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'PATIENT_INFO':
      return {
        ...state,
        patient: action.payload
      };
    
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case 'ADD_ENTRY':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let allEntries: any = [];
      if (state.patient) {
        allEntries = state.patient.entries;
      }
      console.log('allEntries', allEntries);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: {
            ...state.patients[action.id]
          }
        },
        patient: {
          ...state.patients[action.id],
          entries: allEntries.concat(action.payload)
        }
      };
    default:
      return state;
  }
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "PATIENT_INFO",
    payload: patient
  };
};

export const setDiagnoses = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnosesList
  };
};

export const addEntry = (newEntry: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry,
    id
  };
};
