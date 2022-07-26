import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import AuthProvider from './context/AuthProvider.jsx';
import { socketContext } from './context/contex.js';

import MainPage from './MainPage.jsx';
import { addMessage } from './slices/messagesSlice.js';
//import {addChannel, removeChannel, renameChannel} from './slices/channelsSlice.js';
const App = () => {
  const socket = io();
  const dispath = useDispatch();

  socket.on("newMessage", (payload) => {
    dispath(addMessage(payload));
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

  const socketApi = {
    sendMessage: (...args) => socket.volatile.emit('newMessage', ...args),
  }

  // socket.emit('newChannel', ({ message }) => dispath(addChannel(message)));
  // socket.emit('removeChannel', ({ message }) => dispath(removeChannel(message)));
  // socket.emit('renameChannel', ({ message }) => dispath(renameChannel(message)));
  return (
    <AuthProvider>
      <socketContext.Provider value={socketApi}>
        <div className='h-100' id='chat'>
          <MainPage />
        </div>
      </socketContext.Provider>
    </AuthProvider>
  )
}

export default App;
