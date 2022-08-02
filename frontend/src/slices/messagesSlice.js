import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, {payload}) {
      state.messages = payload;
    },
    addMessage(state, {payload}) {
      state.messages.push(payload);
    },
    removeMessage(state, {payload}) {
      state.messages = state.messages.filter((message) => message.channelId !== payload);
    }
  }
});

export const { setMessages, addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;