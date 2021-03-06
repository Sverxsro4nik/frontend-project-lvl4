import React from 'react'
import { Button } from 'react-bootstrap';

const Channel = (props) => {
  const { name, defaultActiveChannelId, channelId } = props;
  const variant = channelId === defaultActiveChannelId ? 'secondary' : 'light';
  return (
    <>
      <Button variant={variant} className='w-100 rounded-0 text-start'>
        <span className='me-1'>#</span>
        {name}
      </Button>
    </>
  )
}

export default Channel;