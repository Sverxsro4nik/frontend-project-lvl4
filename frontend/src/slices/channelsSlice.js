import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    // renameChannel(state, { payload }) {
    //   console.log(payload);
    // },
    // removeChannel(state, { payload }) {
    //   console.log(payload);
    // }
  }
});

export const { setChannels, setActualChannel, addChannel } = channelsReducer.actions;
export default channelsReducer.reducer;
// , addChannel, renameChannel, removeChannel