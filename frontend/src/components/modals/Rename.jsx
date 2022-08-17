import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Form,
  FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocketApi } from '../../hooks/hooks.js';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';

const validationChannelsSchema = (channels, text) =>
  yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(text('required'))
      .min(3, text('channelNameLenght'))
      .max(20, text('channelNameLenght'))
      .notOneOf(channels, text('duplicate')),
  });

const Rename = ({ closeHandler, changed, isOpened }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('toast.renamedChannel'));
  const allChannels = useSelector((state) =>
    Object.values(state.channelsReducer.entities)
  );
  const refContainer = useRef('');
  useEffect(() => {
    refContainer.current.focus();
  }, []);
  const activeChannel = allChannels.find((channel) => channel.id === changed);
  const channelsName = allChannels.map((channel) => channel.name);
  const { renameChannel } = useSocketApi();
  const formik = useFormik({
    initialValues: {
      body: activeChannel.name,
    },
    validationSchema: validationChannelsSchema(channelsName, t),
    onSubmit: ({ body }) => {
      const cleanedName = leoProfanity.clean(body);
      renameChannel({ id: changed, name: cleanedName });
      notify();
      closeHandler();
    },
  });
  return (
    <Modal show={isOpened} onHide={closeHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              data-testid="input-body"
              ref={refContainer}
              name="body"
              id="body"
              required=""
              onChange={formik.handleChange}
              value={formik.values.body}
              isInvalid={formik.errors.body && formik.touched}
            />
            <FormLabel className="visually-hidden" htmlFor="body">
              {t('modals.name')}
            </FormLabel>
          </FormGroup>
          <FormControl.Feedback type="invalid" className="d-block">
            {formik.errors.body}
          </FormControl.Feedback>
          <br />
          <div className="d-flex justify-content-end">
            <FormControl
              className="btn btn-primary"
              type="button"
              value={t('modals.cancelButton')}
              onClick={closeHandler}
            />
            <FormControl
              className="btn btn-primary"
              type="submit"
              value={t('modals.sendButton')}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
// END
