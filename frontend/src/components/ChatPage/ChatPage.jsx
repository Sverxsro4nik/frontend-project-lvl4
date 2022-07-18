import React, { useEffect, useState } from 'react';
import axios from 'axios';

import getRoutes from '../../routes/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {}
}

const ChatPage = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(getRoutes.dataPath(), { headers: getAuthHeader() });
      setContent(data);
    }
    fetchContent();
  }, []);
  return (
    <div>
      { content ?  content.channels.map((channel) => <div key={channel.id}>{channel.name}</div>) : <div>загрузка</div> }
    </div>
  )
}

export default ChatPage