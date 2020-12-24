import axios from "axios";

import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";


const fetchDiagnosisList = async () => {
  return await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
};

const fetchPatientInfo = async (id: string) => {
  return await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
};

const fetchPatientList = async () => {  
    return await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    ); 
};   

export default {
  fetchDiagnosisList,
  fetchPatientInfo,
  fetchPatientList
};