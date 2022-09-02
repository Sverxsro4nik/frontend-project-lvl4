/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getRoutes from '../routes/routes';

export const fetchData = createAsyncThunk(
  'channels/fetchChannels',
  async (payload) => {
    const { data } = await axios.get(getRoutes.dataPath(), {
      headers: payload,
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  isLoading: false,
});

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    deleteChannel: channelsAdapter.removeOne,
    channelRename: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      const loadData = (prevState, data) => channelsAdapter.setAll(prevState, data);
      loadData(state, channels);
      state.isLoading = false;
    }).addCase(fetchData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const getChannels = (state) => selectors.selectAll(state);
export const getActualChannel = (state) => state.channels.currentChannelId;

export const getChannelsName = (state) => getChannels(state).map((channel) => channel.name);

export const getLoading = (state) => state.channels.isLoading;

export const {
  setChannels,
  setActualChannel,
  addChannel,
  deleteChannel,
  channelRename,
} = channelsReducer.actions;
export default channelsReducer.reducer;
