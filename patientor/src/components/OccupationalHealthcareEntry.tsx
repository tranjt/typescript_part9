import React from "react";

import { OccupationalHealthcareEntry } from "../types";
import EntryCodeList from "./EntryCodeList";
import { Segment, Icon } from "semantic-ui-react";

interface entryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntrySegment: React.FC<entryProps> = ({ entry }) => {  

  return (
    <div >
      <Segment color="green">
        <h3>{entry.date}  <Icon name="stethoscope" size="large" /> {entry.employerName}</h3>
        <p >{entry.description}</p>
        <EntryCodeList diagnosisCodes={entry.diagnosisCodes} />
      </Segment>
    </div>
  );
};


export default OccupationalHealthcareEntrySegment;
