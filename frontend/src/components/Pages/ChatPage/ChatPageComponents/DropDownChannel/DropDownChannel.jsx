import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { openWindow } from '../../../../../slices/modalSlice';

const DropDownChannel = ({ name, id, handleClick, currentChannelId }) => {
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const dispatch = useDispatch();

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
          Удалить
        </Dropdown.Item>
        <Dropdown.Item onClick={(id) => openRenameChannelWindow(id)}>
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownChannel;
