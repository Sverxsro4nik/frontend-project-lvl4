import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
};

const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openWindow: (state, {payload}) => {
      const { type } = payload;
      state.isOpened = true;
      state.type = type;
    },
    closeModal: (state, {payload}) => {
      state.isOpened = false;
      state.type = null;
    },
  }
});

export const { openWindow, closeModal } = modalsReducer.actions;

export default modalsReducer.reducer;