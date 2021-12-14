import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res): any => {
    const height: number = Number(_req.query.height);
    const weight: number = Number(_req.query.weight);
    
    if (isNaN(weight) || isNaN(height) || !weight || !height) {
        return res.send({
            error: "malformatted parameters"
        }).status(400);
    }

    const result = calculateBmi(height, weight);
    res.send({
        weight,
        height,
        bmi: result
    });
})

const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});