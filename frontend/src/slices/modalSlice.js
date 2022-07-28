import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openWindow(state, {payload}) {

    },
    closeWindow(state, {payload}) {

    },
  }
});

export const { openWindow, closeWindow } = modalsReducer.actions;

export default modalsReducer.reducer;