import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteChannel } from './channelsSlice.js';

import getRoutes from '../routes/routes';

export const fetchMessages = createAsyncThunk(
  'channels/fetchChannels',
  async (payload) => {
    const { data } = await axios.get(getRoutes.dataPath(), {
      headers: payload,
    });
    return data.messages;
  },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const filteredMessages = Object.values(state.entities)
        .filter(({ channelId }) => channelId === action.payload)
        .map((message) => message.id);

      messagesAdapter.removeMany(state, filteredMessages);
    }).addCase(fetchMessages.fulfilled, messagesAdapter.addMany);
  },
});

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);

export const { setMessages, addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
