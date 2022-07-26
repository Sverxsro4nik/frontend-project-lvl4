import React,{ useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth, useSocketApi } from '../../hooks/useAuth';

const MessagesPanel = ({ defaultActiveChannel }) => {
  const { user } = useAuth();
  const socketApi = useSocketApi();
  const messageRef = useRef(null);
  const allMessages = useSelector((state) => state.messagesReducer.messages);
  console.log(allMessages);
  const validationSchema = yup.object().shape({
    message: yup.string().trim().required('Required'),
  });
  useEffect(() => {
    messageRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const message = {
        text: values.body,
        channelId: defaultActiveChannel.id,
        username: user.username,
      };
      try {
        console.log('send message')
        await socketApi.sendMessage(message);
        console.log(message);
        messageRef.current.value = '';
      } catch(e) {
        console.log(e.message);
      }
    },
    validateOnChange: validationSchema
  })
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
        <Form noValidate className='py-1 border rounded-2' onSubmit={formik.handleSubmit}>
          <Form.Group className='input-group'>
            <Form.Control 
              name='body'
              ref={messageRef}
              aria-label='Новое сообщение'
              placeholder='Введите сообщение...'
              className='border-0 p-0 ps-2'
              value={formik.values.body}
              onChange={formik.handleChange}
              id='body'
            />
            <Button variant='group-vertical'disabled={formik.isSubmitting} onClick={formik.handleSubmit}>
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