import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
const Add = ({ show, closeWindow, addTask, tasks }) => {
  const refContainer = useRef('');
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: values => {
      addTask({task: values.body});
      closeWindow();
      values.body = '';
    },
  });
  return (
      <Modal show={show} onHide={closeWindow}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
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

export default Add;
// END