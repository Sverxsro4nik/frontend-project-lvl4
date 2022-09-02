/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  changed: null,
};

const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openWindow: (state, { payload }) => {
      const { type, id } = payload;
      state.isOpened = true;
      state.type = type;
      state.changed = id ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.changed = null;
    },
  },
});

export const getModalValues = (state) => state.modals;

export const { openWindow, closeModal } = modalsReducer.actions;

export default modalsReducer.reducer;
