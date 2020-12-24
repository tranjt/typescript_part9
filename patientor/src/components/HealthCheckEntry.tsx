import React from "react";
import { HealthCheckEntry, Diagnosis } from "../types";
import { Segment, Icon } from "semantic-ui-react";

interface entryProps {
  entry: HealthCheckEntry;
  diagnosisList: Diagnosis[];
}

const HealthCheckEntrySegment: React.FC<entryProps> = ({ entry, diagnosisList }) => {
  

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

  const gethealthCheckRatingColor = () => {
    switch (entry.healthCheckRating) {
      case 0:        
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <div>
      <Segment color="green">
        <h3>{entry.date}  <Icon name="user doctor" size="large" /></h3>
        <p > {entry.description}</p>        
        <Icon color={gethealthCheckRatingColor()} name="heart" />
        {buildDiagnosisList(entry.diagnosisCodes)}
      </Segment>
    </div>
  );
};


export default HealthCheckEntrySegment;
