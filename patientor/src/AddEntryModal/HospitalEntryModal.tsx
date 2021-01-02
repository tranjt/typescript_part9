import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
}

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new HospitalEntry</Modal.Header>
    <Modal.Content>
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHospitalEntryModal;

