import React from 'react';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { initReactI18next } from 'react-i18next';
import { Provider as MainProvider } from 'react-redux';
import { Provider } from '@rollbar/react';
import AuthProvider from './context/AuthProvider.jsx';

import resources from './locales/locales.js';
import MainPage from './MainPage.jsx';
import store from './slices/index.js';

const rollbarrConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'production',
};

const init = async (socket) => {
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
