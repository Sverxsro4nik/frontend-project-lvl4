import React from 'react';
import { Modal } from 'react-bootstrap';
import modalsWindow from '../modals';
import { useDispatch, useSelector } from 'react-redux';
import { closeWindow } from '../../slices/modalSlice';

const MainModal = () => {
  const isOpened = useSelector((state) => state.modalsReducer.isOpened);
  const type = useSelector((state) => state.modalsReducer.type);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeWindow());
  }

  const ActyalModal = modalsWindow(type);
  return (
    <>
      <Modal show={isOpened} closeWindow={closeHandler} centered>
        {ActyalModal && <ActyalModal closeHandler={closeHandler}/>}
      </Modal>
    </>
  )
}

export default MainModal;