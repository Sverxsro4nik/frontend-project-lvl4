/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message/Message.jsx';
import MessagesPanelHeader from '../MessagesPanelHeader/MessagesPanelHeader.jsx';
import NewMessageForm from '../NewMessageForm/NewMessageForm.jsx';

const MessagesPanel = () => {
  const allMessages = useSelector((state) => Object.values(state.messagesReducer.entities));
  const currentChannelId = useSelector(
    (state) => state.channelsReducer.currentChannelId,
  );
  const allChannels = useSelector((state) => Object.values(state.channelsReducer.entities));
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
