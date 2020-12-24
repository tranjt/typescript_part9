import React from "react";
import { Entry, Diagnosis } from "../types";
import EntryView from "./EntryView";

interface entryProps {
  entries: Entry[] | null;
  diagnosisList: Diagnosis[];
}

const EntryList: React.FC<entryProps> = ({ entries, diagnosisList }) => {

  const renderEntries = () => {    
    let entriesList;
    
    if (entries) {
      entriesList = entries.map(entry => {        
        return <EntryView key={entry.date} entry={entry} diagnosisList={diagnosisList}/>;
      });
    }
    return entriesList;
  };

  return (
    <div>
      {renderEntries()}
    </div>
  );
};

export default EntryList;