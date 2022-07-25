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
    }
  }
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;