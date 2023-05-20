// success alert component for displaying success messages to user after successful actions globally across the app using redux toolkit and react-redux hooks for state management and material ui for styling and components snackbar and alert for displaying messages to user

import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAlert, setAlert } from '../redux/slice/alertSlice';

export const Alerts = () => {
  const dispatch = useDispatch();
  const { message, type, open } = useSelector(selectAlert);

  return (
    <Snackbar
      open={open}
      onClose={() => {
        dispatch(setAlert({ message: '', type: '', open: false }));
      }}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={type}
        variant="filled"
        onClose={() => {
          dispatch(setAlert({ message: '', type: '', open: false }));
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
