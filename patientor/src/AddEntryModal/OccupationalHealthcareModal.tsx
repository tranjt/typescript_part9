import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddOccupationalHealthcareEntry, { OccupationalHealthcareEntryFormValues } from './AddOccupationalHealthcareEntry';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
}

const AddOccupationalHealthcareModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Occupational Healthcare Entry</Modal.Header>
    <Modal.Content>
      <AddOccupationalHealthcareEntry onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOccupationalHealthcareModal;
