import axios from "axios";

import { Diagnosis, Entry, Patient, EntryFormValues } from "../types";
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

const addEntry = async (id: string, entry: EntryFormValues) => {
  return await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
};


export default {
  fetchDiagnosisList,
  fetchPatientInfo,
  fetchPatientList,
  addEntry
};