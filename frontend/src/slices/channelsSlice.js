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
    channelRename(state, { payload }) {
      const { id, name } = payload;
      const channel = state.channels.find((channel) => channel.id === id);
      channel.name = name;
    },
  }
});

export const { setChannels, setActualChannel, addChannel, deleteChannel, channelRename } = channelsReducer.actions;
export default channelsReducer.reducer;
// renameChannel