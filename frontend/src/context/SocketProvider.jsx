import React, { useEffect } from 'react';
import { socketContext } from './contex.js';

import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel,
  setActualChannel,
  deleteChannel,
  channelRename,
} from '../slices/channelsSlice.js';
import store from '../slices/index';

const SocketProvider = ({ socket, children }) => {
  console.log(store);
  useEffect(() => {
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
      store.dispatch(channelRename({ id, changes: { name: name } }));
    });
  }, [socket]);

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
    renameChannel: ({ name, id }, cb) =>
      socket.emit('renameChannel', { name, id }, (response) => {
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

export default SocketProvider;
