import React from "react";
import { Entry } from "../types";
import EntryView from "./EntryView";

interface entryProps {
  entries: Entry[] | null;  
}

const EntryList: React.FC<entryProps> = ({ entries }) => {

  const renderEntries = () => {    
    let entriesList;
    
    if (entries) {
      entriesList = entries.map(entry => {        
        return <EntryView key={entry.id} entry={entry} />;
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