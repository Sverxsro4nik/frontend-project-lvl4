import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openWindow } from '../../../../../slices/modalSlice';

const DropDownChannel = ({ name, id, handleClick, currentChannelId }) => {
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
      <Dropdown.Toggle variant={variant} />

      <Dropdown.Menu>
        <Dropdown.Item onClick={(id) => openRemoveChannelWindow(id)}>
          {t('remove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={(id) => openRenameChannelWindow(id)}>
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownChannel;
