import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
const Rename = ({ show, closeWindow, actualTaskId, renameTask}) => {
  const refContainer = useRef('');
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: values => {
      renameTask(actualTaskId, values.body);
      closeWindow();
      values.body = '';
    },
  });
  return (
    <Modal show={show} onHide={closeWindow}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Rename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <FormControl
                data-testid="input-body"
                ref={refContainer}
                name="body"
                required=""
                onChange={formik.handleChange}
                value={formik.values.body} />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <FormControl className="btn btn-primary" type="submit" value="submit" onClick={formik.handleSubmit} />
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
};

export default Rename;
// END
