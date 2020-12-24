import React from "react";
import { HospitalEntry, Diagnosis } from "../types";
import { Segment, Icon } from "semantic-ui-react";

interface entryProps {
  entry: HospitalEntry;
  diagnosisList: Diagnosis[];
}

const HospitalEntrySegment: React.FC<entryProps> = ({ entry, diagnosisList }) => {

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
        <h3>{entry.date}  <Icon name="hospital" size="large" /> {entry.specialist}</h3>
        <p >{entry.date} {entry.description}</p>
        {buildDiagnosisList(entry.diagnosisCodes)}
      </Segment>
    </div>
  );
};


export default HospitalEntrySegment;
