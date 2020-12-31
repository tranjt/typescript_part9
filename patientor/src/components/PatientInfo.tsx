import React from "react";
import axios from "axios";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";
import { Patient, Entry } from "../types";
import EntryList from "./EntryList";
import AddHealthCheckEntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";
import { Button } from "semantic-ui-react";

interface patientProps {
  patient: Patient | null;
}

const PatientInfo: React.FC<patientProps> = ({ patient }) => {
  const [, dispatch] = useStateValue();

  const [modalHealthCheckOpen, setModalHealthCheckOpen] = React.useState<boolean>(false);

  const openHealthCheckEntryModal = (): void => setModalHealthCheckOpen(true);

  const closeHealthCheckEntryModal = (): void => {
    setModalHealthCheckOpen(false);
  };

  if (!patient) {
    return (
      <div>
        loading...
      </div>
    );
  }

  const submitNewHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
    console.log(values);
    console.log(patient.id);
     try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      patient.entries.push(newEntry);
      dispatch({ type: "UPDATE_PATIENT_INFO", payload: patient });

    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(e.response.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access      
      //setError(e.response.data.error);
    } 

    closeHealthCheckEntryModal();
  };

  const getGenderIcon = () => {
    if (patient.gender === "male") {
      return "mars";
    }
    return "venus";
  };

  return (
    <div>
      <AddHealthCheckEntryModal
        modalOpen={modalHealthCheckOpen}
        onSubmit={submitNewHealthCheckEntry}
        onClose={closeHealthCheckEntryModal}
      />
      <Button onClick={() => openHealthCheckEntryModal()}>Add New Health Check Entry</Button>

      <h1>{patient.name}  <Icon name={getGenderIcon()} size="large" /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <EntryList entries={patient.entries} />


    </div>
  );
};

export default PatientInfo;