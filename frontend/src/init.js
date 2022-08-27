import React from 'react';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { initReactI18next } from 'react-i18next';
import { Provider as MainProvider } from 'react-redux';
import { Provider } from '@rollbar/react';
import AuthProvider from './context/AuthProvider.jsx';

import resources from './locales/locales.js';
import MainPage from './MainPage.jsx';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, deleteChannel, channelRename } from './slices/channelsSlice.js';
import store from './slices/index.js';

const rollbarrConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'production',
};

const init = async (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload.id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelRename({ id, changes: { name } }));
  });
  const defaultlanguage = 'ru';
  await i18next.use(initReactI18next).init({
    lng: defaultlanguage,
    debug: false,
    resources,
  });
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);
  return (
    <Provider config={rollbarrConfig}>
      <MainProvider store={store}>
        <AuthProvider>
          <div className="h-100" id="chat">
            <MainPage socket={socket} />
          </div>
        </AuthProvider>
      </MainProvider>
    </Provider>
  );
};

export default init;
