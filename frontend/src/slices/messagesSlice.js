import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const filteredMessages = Object.values(state.entities)
        .filter(({ channelId }) => channelId === action.payload)
        .map((message) => message.id);

      messagesAdapter.removeMany(state, filteredMessages);
    });
  },
});

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages
);

export const { setMessages, addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
