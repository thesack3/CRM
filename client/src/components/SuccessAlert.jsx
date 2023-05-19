// success alert component for displaying success messages to user after successful actions globally across the app using redux toolkit and react-redux hooks for state management and material ui for styling and components snackbar and alert for displaying messages to user

import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAlert } from '../redux/slice/alertSlice';

export const SuccessAlert = () => {
  const { message, type, open } = useSelector(selectAlert);

  console.log('message---------------', message, type, open);

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};