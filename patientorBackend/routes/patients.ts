import express from 'express';
import patientsService from '../service/patientService';
import { toNewPatientEntry } from '../utils/helper';
import { newHostpitalEntry, newHealthCheckEntry, newOccupationalHealthcareEntry } from '../utils/entryHelper';
import { EntryType, Entry } from '../types';
import patientService from '../service/patientService';


const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatienByID(req.params.id);
  if (!patient) {
    res.status(400).json('error: patient not found');
  }
  res.json(patient);
});


router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const entry = req.body;
  const patientID = req.params.id;
 
  const patient = patientService.getPatienByID(patientID);

  if (!patient || !entry) {
    return res.status(400).send({ error: 'invalid entry' });
  }

  try {
    let newEntry: Entry | undefined;
    if (entry.type === EntryType.Hospital) {
      newEntry = newHostpitalEntry(entry)
    }
    if (entry.type === EntryType.HealthCheck) {
      newEntry = newHealthCheckEntry(entry)
    }
    if (entry.type === EntryType.OccupationalHealthcare) {
      newEntry = newOccupationalHealthcareEntry(entry)
    }

    if (!newEntry) {
      return res.status(400).send({ error: 'invalid entry' });
    }
    
    patientService.addDianoseEntry(newEntry, patientID);
    return res.status(201).json(newEntry);
    
  } catch (e) {
    return res.status(400).send(e.message);
  }
});



export default router;