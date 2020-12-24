import React from "react";
import { Entry } from "../types";
import HealthCheckEntrySegment from "./HealthCheckEntry";
import HospitalEntrySegment from "./HospitalEntry";
import OccupationalHealthcareEntrySegment from "./OccupationalHealthcareEntry";

interface entryProps {
  entry: Entry;
}

const EntryView: React.FC<entryProps> = ({ entry }) => {
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
      return <HealthCheckEntrySegment entry={entry} />;
    case "Hospital":
      return <HospitalEntrySegment entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntrySegment entry={entry} />;
    default:
      return assertNever(entry);
  }
};


export default EntryView;
