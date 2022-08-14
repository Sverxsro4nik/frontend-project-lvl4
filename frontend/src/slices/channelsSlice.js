import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState({
  currentChannelId: 1,
});

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelAdapter.addMany,
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel: channelAdapter.addOne,
    deleteChannel: channelAdapter.removeOne,
    channelRename: channelAdapter.updateOne,
  },
});

export const selectors = channelAdapter.getSelectors((state) => state.channels);

export const {
  setChannels,
  setActualChannel,
  addChannel,
  deleteChannel,
  channelRename,
} = channelsReducer.actions;
export default channelsReducer.reducer;
