import React from 'react';
import { BsPlusSquare } from "react-icons/bs";
import { Button, Nav } from 'react-bootstrap';
import Channel from '../Channel/Channel';

const ChannelsPanel = (props) => {
  const { allChannels } = props;
  const defaultActiveChannel = allChannels[0].id;
  console.log(defaultActiveChannel);
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
        <span>Каналы</span>
        <Button variant='light' className="p-0 text-primary btn btn-group-vertical">
          <BsPlusSquare />
        </Button>
      </div>
      <Nav defaultActiveKey={'#general'} className="flex-column nav-pills nav-fill px-2" as={'ul'}>
        {allChannels.map((channel) => (
          <Nav.Item key={channel.id} className="w-100" as='li'>
            <Channel name={channel.name}
              defaultActiveChannel={defaultActiveChannel}
              channelId={channel.id}
            />
          </Nav.Item>
          )
        )}
      </Nav>
    </div>
  )
}

export default ChannelsPanel;
