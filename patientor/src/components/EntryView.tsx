import React from "react";
import { Entry, Diagnosis } from "../types";
import HealthCheckEntrySegment from "./HealthCheckEntry";
import HospitalEntrySegment from "./HospitalEntry";
import OccupationalHealthcareEntrySegment from "./OccupationalHealthcareEntry";

interface entryProps {
  entry: Entry ;
  diagnosisList: Diagnosis[];
}

const EntryView: React.FC<entryProps> = ({ entry, diagnosisList }) => {
  /**
 * Helper function for exhaustive type checking
 */
  const assertNever = (value: null): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };  

  if (!entry) {
    return <div>empty</div>;
  }

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntrySegment entry={entry} diagnosisList={diagnosisList} />;
    case "Hospital":
      return <HospitalEntrySegment entry={entry} diagnosisList={diagnosisList} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntrySegment entry={entry} diagnosisList={diagnosisList} />;
    default:
      return assertNever(entry);
  }

};

export default EntryView;
