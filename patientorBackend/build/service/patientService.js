"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getNonSensitivePatientData = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: uuid_1.v4() }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getNonSensitivePatientData,
    addPatient
};
