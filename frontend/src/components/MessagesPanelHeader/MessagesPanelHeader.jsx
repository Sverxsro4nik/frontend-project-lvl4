import React from 'react'

const MessagesPanelHeader = ({ activeChannel, messagesCount }) => {
  return (
    <div className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0'>
        # { activeChannel ? activeChannel.name : '' }
      </p>
      <span className='text-muted'>{messagesCount} сообщений</span>
    </div>
  )
}

export default MessagesPanelHeader;
