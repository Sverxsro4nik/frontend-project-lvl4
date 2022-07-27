import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setActualChannel } from '../../slices/channelsSlice';

const Channel = ({ channel }) => {
  const { id, name } = channel;
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(setActualChannel(id))
  };
  return (
    <>
      <Button
        variant={variant}
        className='w-100 rounded-0 text-start'
        onClick={() => handleClick(id)}
      >
        <span className='me-1'>#</span>
        {name}
      </Button>
    </>
  )
}

export default Channel;