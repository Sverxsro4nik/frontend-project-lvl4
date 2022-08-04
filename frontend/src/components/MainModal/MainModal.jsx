import React from 'react';
import { Modal } from 'react-bootstrap';
import modalsWindow from '../modals';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';

const MainModal = () => {
  const isOpened = useSelector((state) => state.modalsReducer.isOpened);
  const type = useSelector((state) => state.modalsReducer.type);
  const changed = useSelector((state) => state.modalsReducer.changed);
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  }

  const ActyalModal = modalsWindow(type);
  return (
    <>
      <Modal show={isOpened} onHide={closeHandler} centered>
        {ActyalModal && <ActyalModal closeHandler={closeHandler} changed={changed} allChannels={allChannels}/>}
      </Modal>
    </>
  )
}

export default MainModal;