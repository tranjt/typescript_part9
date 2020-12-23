import React from "react";
import { Icon } from 'semantic-ui-react';
import { Patient, Diagnosis } from "../types";

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
      return <Icon name="mars" size='large' />;
    }
    return <Icon name="venus" size='large' />;
  };

  const getDiagnosisName = (code: string): string | undefined =>  {
    const diagnosis =  diagnosisList.find(d => d.code === code);
    if (diagnosis) {
      return diagnosis.name;
    }
  };   

  const buildDiagnosisList = (diagnosisCodes: string[] | undefined) => {
    let listItems;
    if (diagnosisCodes) {
      listItems = diagnosisCodes.map(diaCode => {
        return<li key={diaCode}>{diaCode} {getDiagnosisName(diaCode)}</li>;
      });            
    }    
    return <ul>{listItems}</ul>;
  };

  const renderEntries = () => {    
    let entriesList;
    if (patient.entries) {
      entriesList = patient.entries.map(entry => {
        return <div key={entry.date}>
          <p >{entry.date} {entry.description}</p>
          {buildDiagnosisList(entry.diagnosisCodes)}
        </div>;
      });
    }        
    return entriesList;
  };

  return (
    <div>
      <h1>{patient.name} {getGenderIcon()}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {renderEntries()}
    </div>
  );
};

export default PatientInfo;