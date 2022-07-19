import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state) {
      state.messages = []
    }
  }
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;