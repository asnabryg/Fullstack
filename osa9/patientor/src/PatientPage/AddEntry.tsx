import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import EntryForm, { EntryFormValues } from './EntryForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}

const AddEntry = ({ modalOpen, onClose, onSubmit, error }: Props) => {

    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add new entry</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
                <EntryForm onSubmit={onSubmit} onCancel={onClose} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntry;