import React from "react";
import { CoursePart } from "../types";

const Content = ({content}: {content: CoursePart[]}) => {
    return (
        <div>
            {content.map((c: {name: string, exerciseCount: number}) => (
                <div key={c.name}>
                    <p>{c.name} {c.exerciseCount}</p>
                </div>
            ))}
        </div>
    )
};

export default Content