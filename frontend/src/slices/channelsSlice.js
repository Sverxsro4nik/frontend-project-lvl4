import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  defaultChannel: 0
};

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      const { channels } = payload;
      state.channels = channels;
    },
    addChannel(state, { payload }) {
      const { channel } = payload;
      state.channels.push(channel);
    },
    renameChannel(state, { payload }) {
      console.log(payload);
    },
    removeChannel(state, { payload }) {
      console.log(payload);
    }
  }
});

export const { setChannels, addChannel, renameChannel, removeChannel } = channelsReducer.actions;
export default channelsReducer.reducer;