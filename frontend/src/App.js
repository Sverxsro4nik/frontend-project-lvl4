import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import AuthProvider from './context/AuthProvider.jsx';

import MainPage from './MainPage.jsx';
import { addMessage } from './slices/messagesSlice.js';

const App = () => {
  const socket = io();
  const dispath = useDispatch();

  socket.on("newMessage", ({ message }) => {
    dispath(addMessage(message));
  });

  socket.emit('newMessage', ({ message }) => dispath(addMessage(message)));
  return (
    <AuthProvider>
      <div className='h-100' id='chat'>
        <MainPage />
      </div>
    </AuthProvider>
  )
}

export default App;
