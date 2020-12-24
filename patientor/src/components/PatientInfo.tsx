import React from "react";
import { Icon } from "semantic-ui-react";
import { Patient, Diagnosis } from "../types";
import EntryList from "./EntryList";

interface patientProps {
  patient: Patient | null;
  diagnosisList: Diagnosis [];
}

const PatientInfo: React.FC<patientProps> = ({ patient, diagnosisList }) => {

  if (!patient) {
    return (
      <div>
        loading...
      </div>
    );
  }  

  const getGenderIcon = () => {
    if (patient.gender === "male") {
      return "mars";
    }
    return "venus";
  }; 
 
  return (
    <div>
      <h1>{patient.name}  <Icon name={getGenderIcon()} size="large" /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>     
      <EntryList entries={patient.entries} diagnosisList={diagnosisList} />
    </div>
  );
};

export default PatientInfo;