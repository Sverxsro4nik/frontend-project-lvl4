import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const MessagesPanel = (props) => {
  const allMessages = useSelector((state) => state.messagesReducer.messages);
  const { defaultActiveChannel } = props;
  return (
    <div className='col p-0 h100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            # { defaultActiveChannel ? defaultActiveChannel.name : '' }
          </p>
          <span className='text-muted'>{allMessages.length} сообщений</span>
        </div>
        <div id='messages-box' className='chat-messages overflow-auto px-5'></div>
        <div className='mt-auto px-3 py-3'>
          <Form noValidate className='py-1 border rounded-2'>
            <Form.Group className='has-validation input-group'>
              <Form.Control 
                name="body"
                aria-label='Новое сообщение'
                placeholder='Введите сообщение...'
                className='border-0 p-0 ps-2'
                value=''
              />
              <Button variant='group-vertical'>
                <ArrowRightSquare size={20} />
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MessagesPanel