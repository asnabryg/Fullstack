import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({content}: {content: CoursePart[]}) => {
    return (
        <div>
            {content.map(p => (
                <Part key={p.name} part={p} />
            ))}
        </div>
    )
};

export default Content