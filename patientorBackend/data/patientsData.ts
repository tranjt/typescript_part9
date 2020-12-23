import patientsData from './patients';
import { Patient } from '../types';
import { toNewPatientEntry } from '../utils/helper';

const data = patientsData;

const patientEntries: Patient[] = data.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;    
  return object;
});

export default patientEntries;