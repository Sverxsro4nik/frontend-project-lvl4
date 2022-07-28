import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';

// BEGIN (write your solution here)
const Remove = ({ closeWindow, show, actualTaskId, removeTask}) => {
  const handleClose = (e) => {
    e.preventDefault();
    removeTask(actualTaskId);
    closeWindow();
  };

  return (
    <Modal show={show} onHide={closeWindow}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <input type="button" className="btn btn-danger" onClick={handleClose} value="remove" />
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
};

export default Remove;
// END
