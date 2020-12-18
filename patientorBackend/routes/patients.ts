import express from 'express';
import patientsService from '../service/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientData());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient data!');
});

export default router;