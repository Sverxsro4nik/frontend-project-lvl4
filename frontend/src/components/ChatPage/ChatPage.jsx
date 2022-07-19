import React, { useEffect } from 'react';
import axios from 'axios';

import getRoutes from '../../routes/routes';
import { useDispatch, useSelector } from 'react-redux';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {}
}

const ChatPage = () => {
  const channels = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(getRoutes.dataPath(), { headers: getAuthHeader() });
      console.log(data);
    }
    fetchContent();
  }, []);
  return (
    <div>
      { channels ?  channels.map((channel) => <div key={channel.id}>{channel.name}</div>) : <div>загрузка</div> }
    </div>
  )
}

export default ChatPage