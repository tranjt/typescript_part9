"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../service/patientService"));
const helper_1 = require("../utils/helper");
const entryHelper_1 = require("../utils/entryHelper");
const types_1 = require("../types");
const patientService_2 = __importDefault(require("../service/patientService"));
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatienByID(req.params.id);
    if (!patient) {
        res.status(400).json('error: patient not found');
    }
    res.json(patient);
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = helper_1.toNewPatientEntry(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    const entry = req.body;
    const patientID = req.params.id;
    const patient = patientService_2.default.getPatienByID(patientID);
    if (!patient || !entry) {
        return res.status(400).send({ error: 'invalid entry' });
    }
    try {
        let newEntry;
        if (entry.type === types_1.EntryType.Hospital) {
            newEntry = entryHelper_1.newHostpitalEntry(entry);
        }
        if (entry.type === types_1.EntryType.HealthCheck) {
            newEntry = entryHelper_1.newHealthCheckEntry(entry);
        }
        if (entry.type === types_1.EntryType.OccupationalHealthcare) {
            newEntry = entryHelper_1.newOccupationalHealthcareEntry(entry);
        }
        if (!newEntry) {
            return res.status(400).send({ error: 'invalid entry' });
        }
        patientService_2.default.addDianoseEntry(newEntry, patientID);
        return res.status(201).json(newEntry);
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
});
exports.default = router;
