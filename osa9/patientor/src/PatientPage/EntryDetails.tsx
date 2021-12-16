/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Icon, Container } from 'semantic-ui-react';
import { Entry } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EntryDetails: React.FC<{ entry: Entry, diagnoses: any }> = ({ entry, diagnoses }) => {
    const style = {
        border: "solid lightgray 1px",
        borderRadius: "5px",
        padding: "5px",
        margin: '10px',
    };
    const getDiagnosisInfo = (code: string): string => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return diagnoses[code].name;
    };

    switch (entry.type) {
        case "Hospital":
            return (
                <Container style={style}>
                    <div>
                        <h4>{entry.date}<Icon name="hospital outline" size="big" /></h4>
                        <p>{entry.description}</p>
                        {entry.diagnosisCodes &&
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            entry.diagnosisCodes.map((code : any) =>
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                <li key={code}>
                                    {code} {getDiagnosisInfo(code)}
                                </li>
                            )}
                            <br />
                    </div>
                </Container>
            );
        case "OccupationalHealthcare":
            return (
                <div>
                    <Container style={style}>
                        <h4>{entry.date}<Icon name="stethoscope" size="big" /></h4>
                        <p>{entry.description}</p>
                        {entry.diagnosisCodes &&
                            entry.diagnosisCodes.map(code =>
                                <li key={code}>
                                    {code} {getDiagnosisInfo(code)}
                                </li>
                            )}
                        <br />
                    </Container>
                </div>
            );
        
        case "HealthCheck":
            const colors = (rating: number): string => {
                switch (rating) {
                    case 1:
                        return 'green';
                    case 2:
                        return 'yellow';
                    case 3:
                        return 'orange';
                    case 4:
                        return 'red';
                    default:
                        return 'green';
                }
            };
            return (
                <div>
                    <Container style={style}>
                        <h4>{entry.date}<Icon name="user md" size="big" /></h4>
                        <p>{entry.description}</p>
                        <Icon name='heart' style={{ color: colors(entry.healthCheckRating)}} />
                    </Container>
                </div>
            );
        default:
            return assertNever(entry);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const assertNever = (value: any): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default EntryDetails;