import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import AuthProvider from './context/AuthProvider.jsx';
import { socketContext } from './context/contex.js';

import MainPage from './MainPage.jsx';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, setActualChannel } from './slices/channelsSlice.js';
const App = () => {
  const socket = io();
  const dispacth = useDispatch();

  socket.on("newMessage", (payload) => {
    dispacth(addMessage(payload));
  });
  socket.on("newChannel", (payload) => {
    console.log('channel in socket.on', payload);
    dispacth(addChannel(payload));
  });
  // socket.on("removeChannel", ({ message }) => {
  //   dispath(removeChannel(message));
  // });
  // socket.on("renameChannel", ({ message }) => {
  //   dispath(renameChannel(message));
  // });

  const socketApi = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    newChannel: (name, cb) => {
      socket.emit('newChannel', { name }, (response) => {
        const { status, data: { id } } = response;
    
        if (status === 'ok') {
          dispacth(setActualChannel(id));
          cb();
          return response.data;
        }
      });
    }
  }
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
