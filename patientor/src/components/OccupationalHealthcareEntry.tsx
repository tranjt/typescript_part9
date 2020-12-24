import React from "react";
import { OccupationalHealthcareEntry, Diagnosis } from "../types";

import { Segment, Icon } from "semantic-ui-react";

interface entryProps {
  entry: OccupationalHealthcareEntry;
  diagnosisList: Diagnosis[];
}
const OccupationalHealthcareEntrySegment: React.FC<entryProps> = ({ entry, diagnosisList }) => {

  const getDiagnosisName = (code: string): string | undefined => {
    const diagnosis = diagnosisList.find(d => d.code === code);
    if (diagnosis) {
      return diagnosis.name;
    }
  };
  
  const buildDiagnosisList = (diagnosisCodes: string[] | undefined) => {
    let listItems;
    if (diagnosisCodes) {
      listItems = diagnosisCodes.map(diaCode => {
        return <li key={diaCode}>{diaCode} {getDiagnosisName(diaCode)}</li>;
      });
    }
    return <ul>{listItems}</ul>;
  };

  return (
    <div >
      <Segment color="green">
        <h3>{entry.date}  <Icon name="stethoscope" size="large" /> {entry.employerName}</h3>
        <p >{entry.description}</p>
        {buildDiagnosisList(entry.diagnosisCodes)}
      </Segment>
    </div>
  );
};


export default OccupationalHealthcareEntrySegment;
