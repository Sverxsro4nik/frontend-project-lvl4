import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message/Message';
import MessagesPanelHeader from '../MessagesPanelHeader/MessagesPanelHeader';
import NewMessageForm from '../NewMessageForm/NewMessageForm';

const MessagesPanel = () => {
  const allMessages = useSelector((state) => state.messagesReducer.messages);
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const [ activeChannel ] = allChannels.filter(({ id }) => id === currentChannelId);
  const activeChannelMessages = allMessages.filter((message) => message.channelId === currentChannelId);
  return (
    <div className='col p-0 h100'>
      <div className='d-flex flex-column h-100'>
        <MessagesPanelHeader activeChannel={activeChannel} messagesCount={activeChannelMessages.length}/>
        <div id='messages-box' className='chat-messages overflow-auto px-5'>
          {activeChannelMessages.map((message) => <Message message={message} key={message.id} />)}
          <NewMessageForm activeChannel={activeChannel}/>
        </div>
      </div>
    </div>
  )
}

export default MessagesPanel