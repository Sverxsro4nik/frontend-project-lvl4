import React, { useEffect } from 'react';
import axios from 'axios';

import getRoutes from '../../routes/routes';
import { useDispatch, useSelector } from 'react-redux';

import { setChannels } from '../../slices/channelsSlice.js';
import { setMessages } from '../../slices/messagesSlice.js';

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
    <div>
      { allChannels ?  allChannels.map((channel) => <div key={channel.id}>{channel.name}</div>) : <div>загрузка</div> }
    </div>
  )
}

export default ChatPage