import React from "react";
import { HealthCheckEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import EntryCodeList from "./EntryCodeList";

interface entryProps {
  entry: HealthCheckEntry;  
}

const HealthCheckEntrySegment: React.FC<entryProps> = ({ entry }) => {   

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
        <EntryCodeList diagnosisCodes={entry.diagnosisCodes} />
      </Segment>
    </div>
  );
};


export default HealthCheckEntrySegment;
