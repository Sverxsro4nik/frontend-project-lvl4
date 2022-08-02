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
    deleteChannel(state, { payload }) {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
    },
    // removeChannel(state, { payload }) {
    //   console.log(payload);
    // }
  }
});

export const { setChannels, setActualChannel, addChannel, deleteChannel } = channelsReducer.actions;
export default channelsReducer.reducer;
// renameChannel