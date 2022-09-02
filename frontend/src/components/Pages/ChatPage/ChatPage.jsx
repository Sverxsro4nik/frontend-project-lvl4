import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthProvider.js';
import { fetchData, getError, getLoading } from '../../../slices/channelsSlice';
import ChannelsPanel from './ChatPageComponents/ChannelsPanel.jsx';
import MessagesPanel from './ChatPageComponents/MessagesPanel.jsx';
import LoadSpinner from './ChatPageComponents/LoadSpinner.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const loading = useSelector(getLoading);
  const loadingError = useSelector(getError);
  useEffect(() => {
    dispatch(fetchData(getAuthHeader()));
  }, [dispatch, getAuthHeader]);

  return (
    loading ? <LoadSpinner /> : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          {
            !loadingError ? (
              <>
                <ChannelsPanel />
                <MessagesPanel />
              </>
            ) : (
              <div className="row h-100 bg-white ">
                <p>{loadingError}</p>
                <button type="button" onClick={() => fetchData(getAuthHeader())}>Повторить запрос</button>
              </div>
            )
          }
        </div>
      </Container>
    )
  );
};

export default ChatPage;
