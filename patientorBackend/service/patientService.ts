import patientsData from '../data/patientsData';
import { v4 as uuidv4 } from 'uuid';

import { Patient, PublicPatient, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientsData;

const getNonSensitivePatientData = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatienByID = (id: string): Patient | undefined => { 
  return patients.find(p => p.id === id); 
};

export default {
  getNonSensitivePatientData,
  addPatient,
  getPatienByID
};