/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useContext, createContext } from 'react';
import store from '../slices/index';
import { setActualChannel } from '../slices/channelsSlice.js';

const socketContext = createContext({});

const useApi = () => {
  const socketApi = useContext(socketContext);
  return socketApi;
};

const ApiProvider = ({ socket, children }) => {
  const socketApi = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    newChannel: (name, cb) => {
      socket.emit('newChannel', { name }, (response) => {
        const {
          status,
          data: { id },
        } = response;

        if (status === 'ok') {
          store.dispatch(setActualChannel(id));
          cb();
          return response.data;
        }
      });
    },
    removeChannel: (id) => {
      socket.emit('removeChannel', { id });
    },
    renameChannel: ({ name, id }, cb) => socket.emit('renameChannel', { name, id }, (response) => {
      if (response.status === 'ok') {
        cb();
      }
    }),
  };
  return (
    <socketContext.Provider value={socketApi}>
      {children}
    </socketContext.Provider>
  );
};

export { ApiProvider, useApi };
