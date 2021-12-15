import diagnoses from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};