/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { setPatient } from "../state";
import { useParams } from "react-router-dom";
import { Icon } from 'semantic-ui-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PatientPage = (_props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id } = useParams<{ id: string }>();
    const [state, dispatch] = useStateValue();

    // const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    // const [error, setError] = React.useState<string | undefined>();

    // const openModal = () => {
    //     setModalOpen(true);
    // };
    // const closeModal = () => {
    //     setModalOpen(false);
    //     setError(undefined);
    // };

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
            } catch (error: unknown) {
                console.log(error);
            }
        };

        if (!state.patient || state.patient.id !== id) {
            void getPatient();
        }

    }, [id, dispatch]);

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
        </div>
    );
};

export default PatientPage;