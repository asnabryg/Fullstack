import React from "react";
import { CoursePart } from "../types";

const Part = ({part}: {part: CoursePart}) => {

    switch (part.type) {
        case "normal":
            return (
                <div>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b> <br />
                        <i>{part.description}</i>
                    </p>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b> <br />
                        project exercies {part.groupProjectCount}
                    </p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b> <br />
                        <i>{part.description}</i> <br />
                        sumbit to {part.exerciseSubmissionLink}
                    </p>
                </div>
            )
        case "special":
            return (<div>
                <p>
                    <b>{part.name} {part.exerciseCount}</b> <br />
                    <i>{part.description}</i> <br />
                    required skils: {part.requirements.map(s =>
                        part.requirements.at(-1) === s ? s : (`${s}, `))}
                </p>
            </div>
            )

        default:
            return assertNever(part);
    }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
};

export default Part;