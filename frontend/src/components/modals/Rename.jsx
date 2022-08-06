import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocketApi } from '../../hooks/hooks.js';

// BEGIN (write your solution here)
const Rename = ({ closeHandler, changed }) => {
  const { t } = useTranslation();
  const refContainer = useRef('');
  const socketApi = useSocketApi();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const { body } = values;
      socketApi.renameChannel({name: body, id: changed});
      closeHandler();
    },
  });
  return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
          <FormControl className="btn btn-primary" type="submit" value={t('modals.cancelButton')} onClick={closeHandler} />
          <FormControl className="btn btn-primary" type="submit" value={t('modals.sendButton')} onClick={formik.handleSubmit}/>
        </Modal.Footer>
      </Modal.Dialog>
  )
};

export default Rename;
// END
