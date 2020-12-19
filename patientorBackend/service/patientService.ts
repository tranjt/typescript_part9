import patientsData from '../data/patients.json';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientsData;

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient =>  {
 const newPatientEntry =  {
   id: uuidv4(),
   ...entry
 };
 patients.push(newPatientEntry);
 return newPatientEntry;
};

export default {
  getNonSensitivePatientData,
  addPatient
};