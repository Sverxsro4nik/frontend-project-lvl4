/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Form, FormLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useApi } from '../../context/ApiProvider.js';
import { getChannels } from '../../slices/channelsSlice.js';

const validationChannelsSchema = (channels) => yup.object().shape({
  rename: yup
    .string()
    .trim()
    .required('required')
    .min(3, 'channelNameLenght')
    .max(20, 'channelNameLenght')
    .notOneOf(channels, 'duplicate'),
});

const Rename = ({ closeHandler, changed, isOpened }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('toast.renamedChannel'));
  const allChannels = useSelector(getChannels);
  const refContainer = useRef('');
  useEffect(() => {
    refContainer.current.focus();
  }, []);
  const activeChannel = allChannels.find((channel) => channel.id === changed);
  const channelsName = allChannels.map((channel) => channel.name);
  const { renameChannel } = useApi();
  const closeModal = () => {
    closeHandler();
    notify();
  };
  const formik = useFormik({
    initialValues: {
      rename: activeChannel.name,
    },
    validationSchema: validationChannelsSchema(channelsName),
    onSubmit: async ({ rename }) => {
      const cleanedName = leoProfanity.clean(rename);
      renameChannel({ id: changed, name: cleanedName }, closeModal);
    },
  });
  return (
    <Modal show={isOpened} onHide={closeHandler} centered>
      <Modal.Header closeButton={closeHandler}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormControl
            data-testid="body"
            className="mb-2"
            type="text"
            ref={refContainer}
            name="rename"
            id="rename"
            onChange={formik.handleChange}
            value={formik.values.rename}
            isInvalid={formik.errors.body && formik.touched}
          />
          <FormLabel htmlFor="rename" className="visually-hidden">Имя канала</FormLabel>
          <FormControl.Feedback type="invalid" className="d-block">
            {t(formik.errors.rename)}
          </FormControl.Feedback>
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
