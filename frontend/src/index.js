import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './init.js';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './slices/index.js';

const app = () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {
        <Provider store={store}>
          <App socket={socket} />
        </Provider>
      }
    </React.StrictMode>
  );
};

app();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
