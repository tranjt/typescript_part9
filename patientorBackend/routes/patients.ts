import express from 'express';
import patientsService from '../service/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });
  res.json(newPatientEntry);
});

export default router;