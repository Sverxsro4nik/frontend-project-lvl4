import React, { useEffect } from 'react';
import axios from 'axios';

import getRoutes from '../../routes/routes';
import { useDispatch, useSelector } from 'react-redux';

import { setChannels } from '../../slices/channelsSlice.js';
import { setMessages } from '../../slices/messagesSlice.js';
import { Container } from 'react-bootstrap';
import ChannelsPanel from '../ChannelsPanel/ChannelsPanel';
import MessagesPanel from '../MessagesPanel/MessagesPanel';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {}
}

const ChatPage = () => {
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(getRoutes.dataPath(), { headers: getAuthHeader() });
      const { channels, messages } = data;
      dispatch(setChannels(channels));
      dispatch(setMessages(messages));
    }
    fetchContent();
  }, [dispatch]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
          <ChannelsPanel  allChannels={allChannels}/>
          <MessagesPanel />
      </div>
    </Container>
  )
}

export default ChatPage