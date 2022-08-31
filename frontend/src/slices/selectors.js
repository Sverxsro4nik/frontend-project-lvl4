import { selectors as channelsSelectors } from './channelsSlice.js';
import { selectors as messagesSelectors } from './messagesSlice.js';

export const getChannels = (state) => channelsSelectors.selectAll(state);
export const getActualChannel = (state) => state.channels.currentChannelId;

export const getMessages = (state) => messagesSelectors.selectAll(state);
export const getModalValues = (state) => state.modals;
