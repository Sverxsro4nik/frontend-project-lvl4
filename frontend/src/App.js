import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import AuthProvider from './context/AuthProvider.jsx';
import { socketContext } from './context/contex.js';

import MainPage from './MainPage.jsx';
import { addMessage, removeMessage } from './slices/messagesSlice.js';
import { addChannel, setActualChannel, deleteChannel } from './slices/channelsSlice.js';
const App = () => {
  const socket = io();
  const dispacth = useDispatch();

  socket.on("newMessage", (payload) => {
    dispacth(addMessage(payload));
  });
  socket.on("newChannel", (payload) => {
    dispacth(addChannel(payload));
  });
  socket.on("removeChannel", (payload) => {
    dispacth(deleteChannel(payload.id));
  });
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
    },
    removeChannel: (id) => {
      socket.emit('removeChannel', { id }, (response) => {
        const { status } = response;
        if (status === 'ok') {
          dispacth(removeMessage(id));
        }
      })
    },
  }
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
