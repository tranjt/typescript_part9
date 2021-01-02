import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthCheckEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new HealthCheckEntry</Modal.Header>
    <Modal.Content>
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHealthCheckEntryModal;

