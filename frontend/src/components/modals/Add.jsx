import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useSocketApi } from '../../hooks/hooks.js';
import { setActualChannel } from '../../slices/channelsSlice.js';

const validationChannelsSchema = (channels) => yup.object().shape({
  name: yup.string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .notOneOf(channels)
});

const Add = ({ closeHandler }) => {
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const socketApi = useSocketApi();
  const channelsName = allChannels.map((channel) => channel.name);
  const dispatch = useDispatch();
  const refContainer = useRef('');
  useEffect(() => {
    refContainer.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsName),
    onSubmit: async (values) => {
      try {
        const { name } = values;
        const channel = {name};
        const data = await socketApi.newChannel(channel);
        console.log(data);
        // TODO: Разобраться с присвоением и получением у id канала
        // dispatch(setActualChannel(data.id));
        closeHandler();
        values.name = '';
      } catch(e) {
        console.log(e.message);
      }
    },
  });
  return (
      <>
        <Modal.Dialog>
          <Modal.Header closeButton={closeHandler}>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <FormControl
                  data-testid="input-body"
                  ref={refContainer}
                  name="name"
                  required=""
                  onChange={formik.handleChange}
                  value={formik.values.name} />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
          <FormControl className="me-2 btn btn-secondary" type="button" value="Отменить" onClick={closeHandler} />
            <FormControl className="btn btn-primary" type="submit" value="Добавить" onClick={formik.handleSubmit} />
          </Modal.Footer>
        </Modal.Dialog>
      </>
  )
};

export default Add;
// END