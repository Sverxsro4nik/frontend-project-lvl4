import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import getRoutes from '../../../routes/routes';
import { useAuth } from '../../../hooks/hooks';

import { setChannels } from '../../../slices/channelsSlice.js';
import { setMessages } from '../../../slices/messagesSlice.js';
import ChannelsPanel from './ChatPageComponents/ChannelsPanel.jsx';
import MessagesPanel from './ChatPageComponents/MessagesPanel.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(getRoutes.dataPath(), {
        headers: getAuthHeader(),
      });
      const { channels, messages } = data;
      dispatch(setChannels(channels));
      dispatch(setMessages(messages));
    };
    fetchContent();
  }, [dispatch, getAuthHeader]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsPanel />
        <MessagesPanel />
      </div>
    </Container>
  );
};

export default ChatPage;
