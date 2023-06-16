import React, { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { ADD_CATEGORY } from '../mutations/addCategory';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/slice/alertSlice';
import { callContext } from '../hooks/useCall';

const AddCategory = ({ open, close, refetch }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('black');

  const [addCategory, { loading, error, data }] = useMutation(ADD_CATEGORY);

  const handleLeadSubmit = async () => {
    try {
      addCategory({
        variables: {
          title: title,
          color: color,
        },
      });
      dispatch(setAlert({ type: 'success', message: 'Category added successfully' }));
      await refetch();
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: 'Category not added' }));
    } finally {
      close();
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>New category Info</DialogTitle>
      <DialogContent>
        <DialogContentText>Tell us about your category!</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MuiColorInput sx={{ marginTop: '20px' }} value={color} onChange={(e) => setColor(e)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleLeadSubmit}>Add Category</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategory;
