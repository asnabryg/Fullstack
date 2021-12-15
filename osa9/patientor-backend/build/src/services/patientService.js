"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const getPatients = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
exports.default = {
    getPatients
};
