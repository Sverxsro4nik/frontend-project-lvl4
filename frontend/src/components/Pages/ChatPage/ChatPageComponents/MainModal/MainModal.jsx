import React from 'react';
import { Modal } from 'react-bootstrap';
import modalsWindow from '../../../../modals';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../../slices/modalSlice';

const MainModal = () => {
  const { isOpened, type, changed } = useSelector(
    (state) => state.modalsReducer
  );
  console.log(changed);
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const ActyalModal = modalsWindow(type);
  return (
    <>
      {ActyalModal && (
        <ActyalModal
          closeHandler={closeHandler}
          changed={changed}
          allChannels={allChannels}
          isOpened={isOpened}
        />
      )}
    </>
  );
};

export default MainModal;
