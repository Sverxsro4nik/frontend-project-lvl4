import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { initReactI18next } from 'react-i18next';
import { Provider } from '@rollbar/react';

import AuthProvider from './context/AuthProvider.jsx';
import { socketContext } from './context/contex.js';

import resources from './locales/locales.js';
import MainPage from './MainPage.jsx';
import { addMessage, removeMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  setActualChannel,
  deleteChannel,
  channelRename,
} from './slices/channelsSlice.js';

const rollbarrConfig = {
  accessToken: '5ccf433c20c4472296ee9912c2c9701d',
  environment: 'production',
};

const App = () => {
  const defaultlanguage = 'ru';
  i18next.use(initReactI18next).init({
    lng: defaultlanguage,
    debug: false,
    resources,
  });
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);
  const socket = io();
  const dispacth = useDispatch();

  socket.on('newMessage', (payload) => {
    dispacth(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispacth(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispacth(deleteChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    console.log('payload in socked', payload);
    dispacth(channelRename(payload));
  });

  const socketApi = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    newChannel: (name, cb) => {
      socket.emit('newChannel', { name }, (response) => {
        const {
          status,
          data: { id },
        } = response;

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
      });
    },
    renameChannel: ({ name, id }) => socket.emit('renameChannel', { name, id }),
  };
  return (
    <Provider config={rollbarrConfig}>
      <AuthProvider>
        <socketContext.Provider value={socketApi}>
          <div className="h-100" id="chat">
            <MainPage />
          </div>
        </socketContext.Provider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
