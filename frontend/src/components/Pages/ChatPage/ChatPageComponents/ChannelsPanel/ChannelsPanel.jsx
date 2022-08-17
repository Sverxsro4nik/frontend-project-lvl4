import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPlusSquare } from 'react-icons/bs';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Channel from '../Channel/Channel.jsx';
import { openWindow } from '../../../../../slices/modalSlice';
import MainModal from '../MainModal/MainModal.jsx';

const ChannelsPanel = () => {
  const { t } = useTranslation();
  const allChannels = useSelector((state) => Object.values(state.channelsReducer.entities));

  const dispatch = useDispatch();

  const openAddChannelWindow = () => {
    dispatch(openWindow({ type: 'addChannel' }));
  };
  return (
    <>
      <MainModal />
      <div className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
        <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
          <span>{t('channels')}</span>
          <Button
            variant='light'
            className='p-0 text-primary btn btn-group-vertical'
            onClick={openAddChannelWindow}>
            <BsPlusSquare />
            <span className='visually-hidden'>+</span>
          </Button>
        </div>
        <Nav defaultActiveKey='#general' className='flex-column nav-pills nav-fill px-2' as='ul'>
          {allChannels.map((channel) => (
            <Nav.Item key={channel.id} className='w-100' as='li'>
              <Channel channel={channel} />
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </>
  );
};

export default ChannelsPanel;
