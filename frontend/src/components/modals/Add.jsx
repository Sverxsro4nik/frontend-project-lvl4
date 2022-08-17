import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { Form, Modal, FormLabel, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useSocketApi } from '../../hooks/hooks.js';

const validationChannelsSchema = (channels, text) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(text('required'))
      .min(3, text('channelNameLenght'))
      .max(20, text('channelNameLenght'))
      .notOneOf(channels, text('duplicate')),
  });

const Add = ({ closeHandler, isOpened }) => {
  const { t } = useTranslation();
  const allChannels = useSelector((state) =>
    Object.values(state.channelsReducer.entities)
  );
  const { newChannel } = useSocketApi();
  const channelsName = allChannels.map((channel) => channel.name);
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
    validationSchema: validationChannelsSchema(channelsName, t),
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
          <Modal.Title> {t('modals.addChannel')} </Modal.Title>
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
            <FormLabel htmlFor="name">{t('modals.name')}</FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
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
