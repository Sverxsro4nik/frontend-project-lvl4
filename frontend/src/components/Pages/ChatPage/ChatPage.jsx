import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthProvider.js';
import { fetchData, getLoading } from '../../../slices/channelsSlice';
import ChannelsPanel from './ChatPageComponents/ChannelsPanel.jsx';
import MessagesPanel from './ChatPageComponents/MessagesPanel.jsx';
import LoadSpinner from './ChatPageComponents/LoadSpinner.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const loading = useSelector(getLoading);
  useEffect(() => {
    dispatch(fetchData(getAuthHeader()));
  }, [dispatch, getAuthHeader]);

  return (
    loading ? <LoadSpinner /> : (
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
