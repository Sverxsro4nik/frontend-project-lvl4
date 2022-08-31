import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../../hooks/hooks';
import { fetchChannels } from '../../../slices/channelsSlice';
import { fetchMessages } from '../../../slices/messagesSlice';
import ChannelsPanel from './ChatPageComponents/ChannelsPanel.jsx';
import MessagesPanel from './ChatPageComponents/MessagesPanel.jsx';
import LoadSpinner from './ChatPageComponents/LoadSpinner.jsx';

const ChatPage = () => {
  const [loading, setLoading] = useState('loading');
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  useEffect(() => {
    dispatch(fetchChannels(getAuthHeader()));
    dispatch(fetchMessages(getAuthHeader()));
    setLoading('load');
  }, [dispatch, getAuthHeader]);

  return (
    loading === 'loading' ? <LoadSpinner /> : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsPanel />
          <MessagesPanel />
        </div>
      </Container>
    )
  );
};

export default ChatPage;
