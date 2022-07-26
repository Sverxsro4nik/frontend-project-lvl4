import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  defaultChannel: 0,
};

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    // addChannel(state, { payload }) {
    //   state.channels.push(payload);
    // },
    // renameChannel(state, { payload }) {
    //   console.log(payload);
    // },
    // removeChannel(state, { payload }) {
    //   console.log(payload);
    // }
  }
});

export const { setChannels } = channelsReducer.actions;
export default channelsReducer.reducer;
// , addChannel, renameChannel, removeChannel