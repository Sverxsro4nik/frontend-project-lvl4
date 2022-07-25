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
      state.channels = payload;
    },
  }
});

export const { setChannels } = channelsReducer.actions;
export default channelsReducer.reducer;