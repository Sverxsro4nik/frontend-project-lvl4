import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocketApi } from '../../hooks/hooks.js';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

// BEGIN (write your solution here)
const Rename = ({ closeHandler, changed, isOpened }) => {
  const { t } = useTranslation();
  const notify = () => toast(t('toast.renamedChannel'));
  const allChannels = useSelector((state) =>
    Object.values(state.channelsReducer.entities)
  );
  const activeChannel = allChannels.find((channel) => channel.id === changed);
  // const allChannelsName = allChannels.map((channel) => channel.name);
  const refContainer = useRef('');
  const { renameChannel } = useSocketApi();
  const formik = useFormik({
    initialValues: {
      body: activeChannel.name,
    },
    onSubmit: (values) => {
      const { body } = values;
      const cleanedName = leoProfanity.clean(body);
      renameChannel({ id: changed, name: cleanedName });
      notify();
      closeHandler();
      return true;
    },
  });
  return (
    <Modal show={isOpened} onHide={closeHandler} centered>
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
              value={formik.values.body}
            />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <FormControl
          className="btn btn-primary"
          type="submit"
          value={t('modals.cancelButton')}
          onClick={closeHandler}
        />
        <FormControl
          className="btn btn-primary"
          type="submit"
          value={t('modals.sendButton')}
          onClick={formik.handleSubmit}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
// END
