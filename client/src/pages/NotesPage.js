import React, { useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Card,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { ADD_REMINDER } from '../mutations/reminder';
import { setAlert } from '../redux/slice/alertSlice';

const NotesPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('Personal');
  const [value, setValue] = useState({
    title: '',
    note: '',
    date: '',
  });

  // handle mutation
  const [addReminder] = useMutation(ADD_REMINDER);

  // handle change
  const handleChange = (e, a) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      await addReminder({
        variables: {
          title: value.title,
          note: value.note,
          date: value.date,
          type: type,
        },
      });
      setValue({
        title: '',
        note: '',
        date: '',
      });
      setType('Personal');
      dispatch(setAlert({ type: 'success', message: 'Reminder added successfully' }));
    } catch (error) {
      dispatch(setAlert({ type: 'error', payload: error.message }));
    } finally {
      setOpen(false);
    }
  };

  return (
    <Container>
      {/* Add task dialog */}
      {open && (
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle
            id="alert-dialog-title"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            Add Task <EditNoteIcon />
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="title"
                  value={value.title}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Take a note"
                  rows={4}
                  multiline
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="note"
                  value={value.note}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="date"
                  value={value.date}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={['Personal', 'Family', 'Work', 'Frinds', 'Priority']}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" variant="outlined" fullWidth size="small" />
                  )}
                  value={type}
                  onChange={(_, value) => setType(value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
            <Button onClick={() => setOpen(false)} variant="outlined" sx={{ padding: '5px 16px' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ padding: '6px 26px', color: '#fff' }}
              color="success"
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Page Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="30px">
        <Typography variant="h4">Notes</Typography>
        <Box display="flex" alignItems="center" gap="5px">
          <TextField
            id="search"
            type="search"
            label="Search"
            size="small"
            sx={{
              width: 600,
              '& .MuiInputBase-root': {
                borderRadius: 20,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button onClick={() => setOpen(true)} variant="contained" endIcon={<AddCircleOutlineIcon />}>
          Add Task
        </Button>
      </Box>
      {/* Notes */}
      <Card sx={{ padding: '20px', backgroundColor: '#E8EBEE' }}>
        <Grid container spacing={3}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ padding: '20px', backgroundColor: '#F9FAFB' }}>
                <Typography variant="h6">Title</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus esse consequatur autem qui
                  possimus ipsam recusandae fuga saepe nemo dolor error quis in, quo consequuntur.
                </Typography>

                <Box display="flex" alignItems="center" gap="5px" marginTop="10px" flexWrap="wrap">
                  <Chip
                    avatar={
                      <Avatar>
                        <AccessTimeIcon />
                      </Avatar>
                    }
                    label="Dec 15 22, 12:44"
                    size="small"
                  />
                  <Chip label="Family" size="small" />
                  <Chip label="Personal" size="small" />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default NotesPage;