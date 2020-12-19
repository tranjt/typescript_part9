"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../service/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatientEntry = patientService_1.default.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(newPatientEntry);
});
exports.default = router;
