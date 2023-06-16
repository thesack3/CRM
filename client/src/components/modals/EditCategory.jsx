import React, { useContext, useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { EDIT_CATEGORY } from '../../mutations/editCategory';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slice/alertSlice';

const EditCategory = ({ categoriesList }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [curCategories, setCurCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('black');

  const [editCategory, { loading, error, data }] = useMutation(EDIT_CATEGORY);

  // set categories
  useEffect(() => {
    if (categoriesList) {
      setCurCategories(categoriesList?.categories);
    }
  }, [categoriesList]);

  useEffect(() => {
    if (selectedCategory) {
      setTitle(selectedCategory.title);
      setColor(selectedCategory.color);
    }
  }, [selectedCategory]);

  const handleLeadSubmit = async () => {
    try {
      updateCategory({
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Category
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedCategory(null);
        }}
        size="md"
        fullWidth
      >
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: '5px' }}>Select your category!</DialogContentText>
          <Autocomplete
            options={curCategories}
            getOptionLabel={(category) => category.title}
            renderInput={(params) => (
              <TextField {...params} label="Categories" variant="outlined" fullWidth size="small" />
            )}
            onChange={(_, value) => setSelectedCategory(value)}
          />
          {selectedCategory && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                name="title"
                value={selectedCategory.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleLeadSubmit}>Update Category</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategory;
