import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    modalsReducer,
  },
});
