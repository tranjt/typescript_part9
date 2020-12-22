import React from "react";
import { Icon } from 'semantic-ui-react';
import { Patient } from "../types";

interface patientProps {
  patient: Patient | null
}

const PatientInfo: React.FC<patientProps> = ({ patient }) => {

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

  return (
    <div>
      <h1>{patient.name} {getGenderIcon()}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfo;