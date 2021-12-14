/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import express, { Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
// import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res): Response => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    if (isNaN(weight) || isNaN(height) || !weight || !height) {
        return res.send({
            error: "malformatted parameters"
        }).status(400);
    }

    const result = calculateBmi(height, weight);
    return res.send({
        weight,
        height,
        bmi: result
    });

});

app.post("/exercises", (_req, res): Response => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = _req.body;

    if (!target || !daily_exercises) {
        return res.send({
            error: "parameters missing"
        });
    }
    
    const haveNan = daily_exercises.find((n: number) => isNaN(n)) !== undefined;  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (haveNan || isNaN(target)) {
        return res.send({
            error: "malformatted parameters"
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.send(calculateExercises(daily_exercises, target));
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});