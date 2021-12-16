/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { setPatient, setDiagnoses, addEntry } from "../state";
import { useParams } from "react-router-dom";
import { Icon, Button } from 'semantic-ui-react';
import { Diagnosis, Entry } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";
import { EntryFormValues } from "./EntryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PatientPage = (_props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id } = useParams<{ id: string }>();
    const [state, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [errori, setError] = React.useState<string | undefined>();

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
            dispatch(addEntry(newEntry, id));
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e) {
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

    const genders = {
        male: "mars" as "mars",
        female: "venus" as "venus",
        other: "genderless" as "genderless"
    };

    useEffect(() => {
        const getPatient = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { data: patientInfo } = await axios.get(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientInfo));
            } catch (e: unknown) {
                console.log(e);
            }
        };

        const getDiagnosesList = async () => {
            try {
                const { data: diagnosesList } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
                dispatch(setDiagnoses(diagnosesList));
            } catch (e: unknown) {
                console.log(e);
            }
        };

        void getDiagnosesList();

        if (!state.patient || state.patient.id !== id) {
            void getPatient();
        }

    }, [id, dispatch, state.patient]);

    if (!state.patient) {
        return (
            <div>
                Invalid patient id.
            </div>
        );
    }

    return (
        <div>
            <h1>{state.patient.name} <Icon name={genders[state.patient.gender]} /></h1>
            <p>
                ssn: {state.patient.ssn} <br />
                occupation: {state.patient.occupation}
            </p>
            <h3>entries</h3>
            {state.patient.entries.map(e =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <div key={e.id}>
                    <EntryDetails entry={e} diagnoses={state.diagnoses} />
                </div>
            )}
            <br />
            <AddEntry modalOpen={modalOpen} onSubmit={submitEntry} error={errori} onClose={closeModal} />
            <Button onClick={() => openModal()}>Add entry</Button>
        </div>
    );
};

export default PatientPage;