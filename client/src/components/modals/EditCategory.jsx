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
  styled,
  Box,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { EDIT_CATEGORY } from '../../mutations/editCategory';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slice/alertSlice';
import { DELETE_CATEGORY } from '../../mutations/addCategory';

const EditCategory = ({ categoriesList, refetchCategories }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [curCategories, setCurCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [updateCategory, { loading, error, data }] = useMutation(EDIT_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  // set categories
  useEffect(() => {
    if (categoriesList) {
      setCurCategories(categoriesList?.categories);
    }
  }, [categoriesList]);

  const handleUpdate = async () => {
    try {
      await updateCategory({
        variables: {
          id: selectedCategory.id,
          title: selectedCategory.title,
          color: selectedCategory.color,
          description: selectedCategory.description,
        },
      });
      dispatch(setAlert({ type: 'success', message: 'Category updated successfully' }));
      setSelectedCategory(null);
      refetchCategories();
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: 'Category not updated' }));
    } finally {
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle delete category
  const handleDelete = async (id, val) => {
    try {
      await deleteCategory({
        variables: {
          id,
        },
      });
      setCurCategories((prevState) => prevState.filter((curCategory) => curCategory.id !== id));
      dispatch(setAlert({ type: 'success', message: 'Category deleted successfully' }));
      refetchCategories();
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: error.message }));
    }
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
        <DialogContent sx={{ minHeight: '250px' }}>
          <DialogContentText sx={{ marginBottom: '8px' }}>Select your category!</DialogContentText>
          <Autocomplete
            options={curCategories}
            getOptionLabel={(category) => category.title}
            // delete category from list with renderOption
            renderOption={(props, category) => (
              <ListItem {...props}>
                <ListItemText primary={category.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleDelete(category.id, category.title);
                    }}
                  >
                    <DeleteIcon fontSize={'small'} color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Categories" variant="outlined" fullWidth size="small" />
            )}
            onChange={(_, value) => setSelectedCategory(value)}
            sx={{ marginBottom: '30px' }}
          />
          {selectedCategory && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                size="small"
                type="text"
                fullWidth
                name="title"
                value={selectedCategory?.title}
                onChange={(e) =>
                  setSelectedCategory((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
                sx={{ marginBottom: '25px' }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                size="medium"
                type="text"
                fullWidth
                name="description"
                value={selectedCategory?.description || ''}
                onChange={(e) =>
                  setSelectedCategory((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
                sx={{ marginBottom: '25px' }}
              />

              <Box style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                <TextField
                  size="small"
                  value={selectedCategory.color}
                  fullWidth
                  onChange={(e) =>
                    setSelectedCategory((prevState) => ({
                      ...prevState,
                      color: e.target.value,
                    }))
                  }
                  type="color"
                />
                <ColorPreview style={{ backgroundColor: selectedCategory.color }} />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update Category</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategory;

// custom color picker
const ColorPreview = styled('div')({
  width: '40px',
  height: '30px',
  marginLeft: '16px',
  border: '2px solid #ccc',
});
