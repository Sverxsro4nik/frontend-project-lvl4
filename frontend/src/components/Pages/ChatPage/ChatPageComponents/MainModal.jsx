import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import modalsWindow from '../../../modals';
import { closeModal } from '../../../../slices/modalSlice';
import { getChannels, getModalValues } from '../../../../slices/selectors';

const MainModal = () => {
  const { isOpened, type, changed } = useSelector(getModalValues);
  const allChannels = useSelector(getChannels);
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
