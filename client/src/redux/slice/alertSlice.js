// create slice for alert state management using redux toolkit and react-redux hooks

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '',
  open: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.open = true;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export const selectAlert = (state) => state.alert;

export default alertSlice.reducer;

// ------------ prototype for using alert slice in component -----------
// import { useDispatch } from 'react-redux';
// import { setAlert } from '../redux/slice/alertSlice';
// const dispatch = useDispatch();
// dispatch(setAlert({ type: 'success', message: 'Lead updated successfully' }));
// dispatch(setAlert({ type: 'error', message: error.message }));
