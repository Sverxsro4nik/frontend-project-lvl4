/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setActualChannel } from '../../../../slices/channelsSlice.js';
import { getActualChannel } from '../../../../slices/selectors.js';
import DropDownChannel from './DropDownChannel.jsx';

const Channel = ({ channel }) => {
  const { id, name, removable } = channel;
  const currentChannelId = useSelector(getActualChannel);
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const dispatch = useDispatch();
  const handleClick = (actualId) => {
    dispatch(setActualChannel(actualId));
  };

  return (
    <>
      {!removable ? (
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => handleClick(id)}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      ) : (
        <DropDownChannel
          name={name}
          id={id}
          handleClick={handleClick}
          currentChannelId={currentChannelId}
        />
      )}
    </>
  );
};

export default Channel;
