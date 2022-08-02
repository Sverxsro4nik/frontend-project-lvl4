import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActualChannel } from '../../slices/channelsSlice.js';

import { useSocketApi } from '../../hooks/hooks';

// BEGIN (write your solution here)
const Remove = ({closeHandler, changed}) => {
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const dispatch = useDispatch();
  const sockedApi = useSocketApi();
  const deleteChannel = (e) => {
    e.preventDefault();
    sockedApi.removeChannel(changed);
    if (changed === currentChannelId) {
      dispatch(setActualChannel(1));
    }
    closeHandler();
  }
  return (
      <Modal.Dialog className='modal-dialog-centered'>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='lead'>Уверены?</p>
          <form>
            <FormGroup>
              <input type="button" className="btn btn-secondary" value="Отменить" onClick={closeHandler}/>
              <input type="button" className="btn btn-danger" value="Удалить" onClick={deleteChannel}/>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal.Dialog>
  )
};

export default Remove;
// END
