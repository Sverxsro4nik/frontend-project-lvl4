import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message/Message';
import MessagesPanelHeader from '../MessagesPanelHeader/MessagesPanelHeader';
import NewMessageForm from '../NewMessageForm/NewMessageForm';

const MessagesPanel = () => {
  const allMessages = useSelector((state) => state.messagesReducer.messages);
  const defaultChannel = useSelector((state) => state.channelsReducer.defaultChannel);
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const activeChannel = allChannels[defaultChannel ?? 0];
  return (
    <div className='col p-0 h100'>
      <div className='d-flex flex-column h-100'>
        <MessagesPanelHeader activeChannel={activeChannel} messagesCount={allMessages.length}/>
        <div id='messages-box' className='chat-messages overflow-auto px-5'>
          {allMessages.map((message) => <Message message={message} key={message.id} />)}
          <NewMessageForm activeChannel={activeChannel}/>
        </div>
      </div>
    </div>
  )
}

export default MessagesPanel