"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../service/patientService"));
const helper_1 = require("../utils/helper");
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
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
        const newPatientEntry = helper_1.toNewPatientEntry(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;
