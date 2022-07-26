import React from 'react';
import { useSelector } from 'react-redux';
import NewMessageForm from '../NewMessageForm/NewMessageForm';

const MessagesPanel = () => {
  const allMessages = useSelector((state) => state.messagesReducer.messages);
  const defaultChannel = useSelector((state) => state.channelsReducer.defaultChannel);
  const allChannels = useSelector((state) => state.channelsReducer.channels);
  const activeChannel = allChannels[defaultChannel ?? 0];
  return (
    <div className='col p-0 h100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            # { activeChannel ? activeChannel.name : '' }
          </p>
          <span className='text-muted'>{allMessages.length} сообщений</span>
        </div>
        <div id='messages-box' className='chat-messages overflow-auto px-5'>
          {allMessages.map((message) => (<div className='text-break mb-2' key={message.id}>
              <b>{message.username}</b>
              : {message.text}
            </div>)
          )}
          <NewMessageForm activeChannel={activeChannel}/>
        </div>
      </div>
    </div>
  )
}

export default MessagesPanel