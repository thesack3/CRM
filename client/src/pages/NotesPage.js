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
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { ADD_TASK } from '../mutations/reminder';
import { setAlert } from '../redux/slice/alertSlice';
import { GET_TASKS } from '../queries/reminder';

const NotesPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [type, setType] = useState('Personal');
  const [value, setValue] = useState({
    title: '',
    note: '',
    date: '',
  });
  // get tasks
  const { loading, data, refetch } = useQuery(GET_TASKS);
  console.log(data);

  // handle mutation
  const [addTask] = useMutation(ADD_TASK);

  // handle change
  const handleChange = (e, a) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      await addTask({
        variables: {
          title: value.title,
          note: value.note,
          date: value.date,
          type,
        },
      });
      setValue({
        title: '',
        note: '',
        date: '',
      });
      setType('Personal');
      dispatch(setAlert({ type: 'success', message: 'Task added successfully' }));
      await refetch();
    } catch (error) {
      dispatch(setAlert({ type: 'error', payload: error.message }));
    } finally {
      setOpen(false);
    }
  };

  // handle single note
  const handleSingleNote = (item) => {
    setNoteModal(true);
    setSelectedNote(item);
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
      {/* Open task dialog */}
      {noteModal && (
        <Dialog open={noteModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            {selectedNote && (
              <Box display="flex" flexDirection="column" gap="10px">
                <Typography variant="h6">{selectedNote.title}</Typography>
                <Typography variant="body2">{selectedNote.note}</Typography>
                <Box display="flex" alignItems="center" gap="5px" marginTop="10px" flexWrap="wrap">
                  <Chip
                    avatar={
                      <Avatar>
                        <AccessTimeIcon />
                      </Avatar>
                    }
                    label={selectedNote.date}
                    size="small"
                  />
                  <Chip label={selectedNote.type} size="small" />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
            <Button onClick={() => setNoteModal(false)} variant="outlined" sx={{ padding: '5px 16px' }}>
              Close
            </Button>
            <Button
              variant="contained"
              sx={{ padding: '6px 26px', color: '#fff' }}
              color="success"
              onClick={() => handleSubmit()}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Page Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" gap="5px" marginBottom="30px">
        <Typography variant="h4">Notes</Typography>
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
        <Autocomplete
          options={['Personal', 'Family', 'Work', 'Frinds', 'Priority']}
          renderInput={(params) => <TextField {...params} label="Type" variant="outlined" fullWidth size="small" />}
          value={type}
          onChange={(_, value) => setType(value)}
          sx={{ width: 200 }}
        />
        <Button
          onClick={() => setOpen(true)}
          sx={{ whiteSpace: 'nowrap', minWidth: 100 }}
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
        >
          Add Task
        </Button>
      </Box>
      {/* Notes */}
      <Card sx={{ padding: '20px', backgroundColor: '#E8EBEE', minHeight: '78vh' }}>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {data &&
              data?.tasks?.length &&
              data.tasks.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Card
                    onClick={() => handleSingleNote(item)}
                    sx={{
                      padding: '20px',
                      backgroundColor: '#F9FAFB',
                      minHeight: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">{item.note}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="5px" marginTop="10px" flexWrap="wrap">
                      <Chip
                        avatar={
                          <Avatar>
                            <AccessTimeIcon />
                          </Avatar>
                        }
                        label={item.date}
                        size="small"
                      />
                      <Chip label={item.type} size="small" />
                    </Box>
                    <DeleteForeverIcon sx={{ marginLeft: 'auto' }} />
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </Card>
    </Container>
  );
};

export default NotesPage;
