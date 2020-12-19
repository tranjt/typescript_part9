import express from 'express';
import patientsService from '../service/patientService';
import { toNewPatientEntry } from '../utils/helper';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;