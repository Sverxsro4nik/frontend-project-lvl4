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
    }
  }
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;