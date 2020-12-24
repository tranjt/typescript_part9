import React from "react";
import { useStateValue } from "../state";

interface entryCodeProps {
  diagnosisCodes: string[] | undefined;
}

const EntryCodeList: React.FC<entryCodeProps> = ({ diagnosisCodes }) => {
  const [{ diagnosisList }] = useStateValue();

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnosisList.find(d => d.code === code);

    if (diagnosis) {
      return diagnosis.name;
    }
  };

  const buildDiagnosisList = () => {
    let listItems;

    if (diagnosisCodes) {
      listItems = diagnosisCodes.map(diaCode => {
        return <li key={diaCode}>{diaCode} {getDiagnosisName(diaCode)}</li>;
      });
    }
    return <ul>{listItems}</ul>;
  };

  return (
    <div>
      {buildDiagnosisList()}
    </div>
  );
};


export default EntryCodeList;