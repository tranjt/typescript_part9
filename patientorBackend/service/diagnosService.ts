import diagnosData from '../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnose = ()  => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};