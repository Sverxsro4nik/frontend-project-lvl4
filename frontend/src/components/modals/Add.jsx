/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import {
  Form, Modal, FormLabel, FormControl,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useApi } from '../../context/ApiProvider.js';
import { getChannelsName } from '../../slices/channelsSlice.js';

const validationChannelsSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('required')
    .min(3, 'channelNameLenght')
    .max(20, 'channelNameLenght')
    .notOneOf(channels, 'duplicate'),
});

const Add = ({ closeHandler, isOpened }) => {
  const { t } = useTranslation();
  const { newChannel } = useApi();
  const channelsName = useSelector(getChannelsName);
  const refContainer = useRef('');
  useEffect(() => {
    refContainer.current.focus();
  }, []);
  const notify = () => toast.success(t('toast.createChannel'));

  const close = () => {
    closeHandler();
    notify();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsName),
    onSubmit: (values) => {
      const { name } = values;
      const cleanedName = leoProfanity.clean(name);
      try {
        newChannel(cleanedName, close);
        values.name = '';
      } catch (e) {
        console.log(e.message);
      }
    },
  });
  return (
    <>
      <Modal show={isOpened} onHide={closeHandler} centered>
        <Modal.Header closeButton={closeHandler}>
          <Modal.Title>
            {' '}
            {t('modals.addChannel')}
            {' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FormControl
              className="mb-2"
              type="text"
              data-testid="input-body"
              ref={refContainer}
              name="name"
              id="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched && formik.errors.name}
            />
            <FormLabel className="visually-hidden" htmlFor="name">{t('modals.name')}</FormLabel>
            <FormControl.Feedback type="invalid">
              {t(formik.errors.name)}
            </FormControl.Feedback>
            <div className="d-flex justify-content-end">
              <FormControl
                className="me-2 btn btn-secondary"
                type="button"
                value={t('modals.cancelButton')}
                onClick={closeHandler}
              />
              <FormControl
                className="btn btn-primary"
                type="submit"
                value={t('modals.addButton')}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Add;
// END
