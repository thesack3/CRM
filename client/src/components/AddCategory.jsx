import React, { useContext, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  styled,
  Box,
} from '@mui/material';
import { ADD_CATEGORY } from '../mutations/addCategory';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/slice/alertSlice';
import { callContext } from '../hooks/useCall';

const AddCategory = ({ open, close }) => {
  const dispatch = useDispatch();

  const { setRefetch } = useContext(callContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('black');

  const [addCategory, { loading, error, data }] = useMutation(ADD_CATEGORY);

  const handleLeadSubmit = async () => {
    try {
      await addCategory({
        variables: {
          title: title,
          color: color,
        },
      });
      dispatch(setAlert({ type: 'success', message: 'Category added successfully' }));
      setRefetch(new Date().getTime());
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
        <Box style={{ display: 'flex', alignItems: 'center', width: '300px', marginTop: '15px' }}>
          <TextField size="small" value={color} onChange={(e) => setColor(e.target.value)} fullWidth type="color" />
          <ColorPreview style={{ backgroundColor: color }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleLeadSubmit}>Add Category</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategory;

// custom color picker
const ColorPreview = styled('div')({
  width: '40px',
  height: '30px',
  marginLeft: '16px',
  border: '2px solid #ccc',
});
