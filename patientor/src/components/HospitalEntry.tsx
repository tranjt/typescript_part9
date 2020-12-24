import React from "react";
import { HospitalEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import EntryCodeList from "./EntryCodeList";

interface entryProps {
  entry: HospitalEntry;
}

const HospitalEntrySegment: React.FC<entryProps> = ({ entry }) => {  

  return (
    <div >
      <Segment color="green">
        <h3>{entry.date}  <Icon name="hospital" size="large" /> {entry.specialist}</h3>
        <p >{entry.date} {entry.description}</p>
        <EntryCodeList diagnosisCodes={entry.diagnosisCodes} />
      </Segment>
    </div>
  );
};


export default HospitalEntrySegment;
