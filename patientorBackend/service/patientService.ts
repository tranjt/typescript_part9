import patientsData from '../data/patients.json';

import { Patient, NonSensitivePatientData } from '../types';

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

const addPatient = () =>  {
  return [];
};

export default {
  getNonSensitivePatientData,
  addPatient
};