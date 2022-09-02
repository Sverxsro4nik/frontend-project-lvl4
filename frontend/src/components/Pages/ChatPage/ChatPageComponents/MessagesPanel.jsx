/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { getChannels, getActualChannel } from '../../../../slices/channelsSlice.js';
import { getMessages } from '../../../../slices/messagesSlice.js';
import Message from './Message.jsx';
import MessagesPanelHeader from './MessagesPanelHeader.jsx';
import NewMessageForm from './NewMessageForm.jsx';

const MessagesPanel = () => {
  const allMessages = useSelector(getMessages);
  const currentChannelId = useSelector(getActualChannel);
  const allChannels = useSelector(getChannels);
  const [activeChannel] = allChannels.filter(
    ({ id }) => id === currentChannelId,
  );
  const activeChannelMessages = allMessages.filter(
    (message) => message.channelId === currentChannelId,
  );
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesPanelHeader
          activeChannel={activeChannel}
          messagesCount={activeChannelMessages.length}
        />
        <div id="messages-box" className="chat-messages px-5 overflow-auto h-100">
          {activeChannelMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>
        <NewMessageForm activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default MessagesPanel;
