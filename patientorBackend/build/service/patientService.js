"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientsData_1 = __importDefault(require("../data/patientsData"));
const uuid_1 = require("uuid");
const patients = patientsData_1.default;
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
const getPatienByID = (id) => {
    return patients.find(p => p.id === id);
};
const addDianoseEntry = (entry, id) => {
    patients.forEach((patient) => {
        if (patient.id === id && entry) {
            patient.entries.push(entry);
        }
        return patient;
    });
};
exports.default = {
    getNonSensitivePatientData,
    addPatient,
    getPatienByID,
    addDianoseEntry
};
