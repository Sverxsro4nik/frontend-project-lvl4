/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getRoutes from '../routes/routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (payload) => {
    const { data } = await axios.get(getRoutes.dataPath(), {
      headers: payload,
    });
    return data.channels;
  },
);

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState({
  currentChannelId: 1,
});

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // setChannels: channelAdapter.addMany,
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel: channelAdapter.addOne,
    deleteChannel: channelAdapter.removeOne,
    channelRename: channelAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, channelAdapter.addMany);
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
