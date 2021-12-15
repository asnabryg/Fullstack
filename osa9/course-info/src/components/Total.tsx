import React from "react";
import { CoursePart } from "../types";

const Total = ({ content }: { content: CoursePart[] }) => {
    return (
        <div>
            Number of exercises{" "}
            {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
};

export default Total;