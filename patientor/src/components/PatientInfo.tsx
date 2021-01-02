import React from "react";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import EntryList from "./EntryList";
import AddHealthCheckEntryModal from "../AddEntryModal/HealthCheckModal";
import AddHospitalEntryModal from "../AddEntryModal/HospitalEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';
import { Button } from "semantic-ui-react";
import patientService from "../service/patient";

interface patientProps {
  patient: Patient | null;
}

const PatientInfo: React.FC<patientProps> = ({ patient }) => {
  const [, dispatch] = useStateValue();

  const [modalHealthCheckOpen, setModalHealthCheckOpen] = React.useState<boolean>(false);
  const [modalHospitalEntryOpen, setModalHospitalEntryOpen] = React.useState<boolean>(false);

  const openHealthCheckEntryModal = (): void => {
    setModalHealthCheckOpen(true);
  };
  const closeHealthCheckEntryModal = (): void => {
    setModalHealthCheckOpen(false);
  };

  const openHospitalEntryModal = (): void => {
    setModalHospitalEntryOpen(true);
  };
  const closeHospitalEntryModal = (): void => {
    setModalHospitalEntryOpen(false);
  };

  if (!patient) {
    return (
      <div>
        loading...
      </div>
    );
  }


  const submitNewHealthCheckEntry = (values: HealthCheckEntryFormValues) => {  
    patientService.addEntry(patient.id, values)
      .then((res) => {
        patient.entries.push(res.data);
        dispatch({ type: "UPDATE_PATIENT_INFO", payload: patient });
      }).catch((error) => {
        console.error(error);
      });

    closeHealthCheckEntryModal();
  };


  const submitHospitalEntryEntry = (values: HospitalEntryFormValues) => {   
    patientService.addEntry(patient.id, values)
      .then((res) => {
        patient.entries.push(res.data);
        dispatch({ type: "UPDATE_PATIENT_INFO", payload: patient });
      }).catch((error) => {
        console.error(error);
      });

    closeHospitalEntryModal();
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

      <AddHospitalEntryModal
        modalOpen={modalHospitalEntryOpen}
        onSubmit={submitHospitalEntryEntry}
        onClose={closeHospitalEntryModal}
      />
      <Button onClick={() => openHospitalEntryModal()}>Add New Hospital Entry</Button>

      <h1>{patient.name}  <Icon name={getGenderIcon()} size="large" /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <EntryList entries={patient.entries} />
    </div>
  );
};

export default PatientInfo;