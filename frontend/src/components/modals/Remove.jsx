import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActualChannel } from '../../slices/channelsSlice.js';

import { useSocketApi } from '../../hooks/hooks';
import { toast } from 'react-toastify';

// BEGIN (write your solution here)
const Remove = ({ closeHandler, changed, isOpened }) => {
  const { t } = useTranslation();
  const notify = () => toast(t('toast.removeChannel'));
  const { removeChannel } = useSocketApi();
  const currentChannelId = useSelector(
    (state) => state.channelsReducer.currentChannelId
  );
  const dispatch = useDispatch();
  const deleteChannel = (e) => {
    e.preventDefault();
    removeChannel(changed);
    notify();
    if (changed === currentChannelId) {
      dispatch(setActualChannel(1));
    }
    closeHandler();
  };
  return (
    <Modal show={isOpened} onHide={closeHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.questionInModal')}</p>
        <form>
          <FormGroup>
            <input
              type="button"
              className="btn btn-secondary"
              value={t('modals.cancelButton')}
              onClick={closeHandler}
            />
            <input
              type="button"
              className="btn btn-danger"
              value={t('modals.removeButton')}
              onClick={deleteChannel}
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
// END
