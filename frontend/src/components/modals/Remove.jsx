/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setActualChannel, getActualChannel } from '../../slices/channelsSlice.js';

import { useSocketApi } from '../../hooks/hooks';

// BEGIN (write your solution here)
const Remove = ({ closeHandler, changed, isOpened }) => {
  const { t } = useTranslation();
  const notify = () => toast.success(t('toast.removeChannel'));
  const { removeChannel } = useSocketApi();
  const currentChannelId = useSelector(getActualChannel);
  const dispatch = useDispatch();
  const deleteChannel = (e) => {
    e.preventDefault();
    removeChannel(changed);
    closeHandler();
    notify();
    if (changed === currentChannelId) {
      dispatch(setActualChannel(1));
    }
  };
  return (
    <Modal show={isOpened} onHide={closeHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.questionInModal')}</p>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={closeHandler}
            className="btn btn-secondary"
          >
            {t('modals.cancelButton')}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteChannel}
          >
            {t('modals.removeButton')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
// END
