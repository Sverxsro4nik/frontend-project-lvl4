import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import AuthProvider from './context/AuthProvider.jsx';

import MainPage from './MainPage.jsx';
import { addMessage } from './slices/messagesSlice.js';
//import {addChannel, removeChannel, renameChannel} from './slices/channelsSlice.js';
const App = () => {
  const socket = io();
  const dispath = useDispatch();

  socket.on("newMessage", ({ message }) => {
    dispath(addMessage(message));
  });
  // socket.on("newChannel", ({ channel }) => {
  //   dispath(addChannel(channel));
  // });
  // socket.on("removeChannel", ({ message }) => {
  //   dispath(removeChannel(message));
  // });
  // socket.on("renameChannel", ({ message }) => {
  //   dispath(renameChannel(message));
  // });

  socket.emit('newMessage', ({ message }) => dispath(addMessage(message)));
  // socket.emit('newChannel', ({ message }) => dispath(addChannel(message)));
  // socket.emit('removeChannel', ({ message }) => dispath(removeChannel(message)));
  // socket.emit('renameChannel', ({ message }) => dispath(renameChannel(message)));
  return (
    <AuthProvider>
      <div className='h-100' id='chat'>
        <MainPage />
      </div>
    </AuthProvider>
  )
}

export default App;
