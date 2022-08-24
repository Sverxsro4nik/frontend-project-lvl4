/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React from 'react';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openWindow } from '../../../../slices/modalSlice';

const DropDownChannel = ({
  name, id, handleClick, currentChannelId,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const variant = id === currentChannelId ? 'secondary' : 'light';

  const openRemoveChannelWindow = () => {
    dispatch(openWindow({ type: 'removing', id }));
  };

  const openRenameChannelWindow = () => {
    dispatch(openWindow({ type: 'renaming', id }));
  };

  return (
    <Dropdown className="d-flex btn-group" as={ButtonGroup}>
      <Button
        variant={variant}
        className="w-100 rounded-0 text-start text-truncate btn"
        onClick={() => handleClick(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle variant={variant}>
        <span className="visually-hidden">{t('channelManagement')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={(id) => openRemoveChannelWindow(id)}>{t('remove')}</Dropdown.Item>
        <Dropdown.Item onClick={(id) => openRenameChannelWindow(id)}>{t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownChannel;
