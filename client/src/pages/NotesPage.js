import React, { useEffect, useState, useCallback } from 'react';
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
  DialogContentText,
  IconButton,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../mutations/reminder';
import { setAlert } from '../redux/slice/alertSlice';
import { GET_TASKS, TASK_TYPES } from '../queries/reminder';

const NotesPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  console.log(selectedNote?._id);
  const [filteredTask, setFilteredTask] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [addType, setAddType] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [type, setType] = useState('');
  const [searchType, setSearchType] = useState('');
  const [value, setValue] = useState({
    title: '',
    note: '',
    date: '',
  });
  // get tasks
  const { loading, data, refetch } = useQuery(GET_TASKS);
  // get task types
  const { loading: typeLoading, data: types } = useQuery(TASK_TYPES, {
    variables: { userId: '' },
  });

  // handle mutation
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  // search filter
  useEffect(() => {
    if (data) {
      let filteredTasks = data.tasks;
      filteredTasks = filteredTasks.filter((t) => t.title.toLowerCase().includes(searchValue.toLowerCase()));

      if (searchType) {
        filteredTasks = filteredTasks.filter((t) => t.type.toLowerCase().includes(searchType.toLowerCase()));
      }

      setFilteredTask(filteredTasks);
    }
  }, [data, searchValue, searchType]);

  // set types from api
  useEffect(() => {
    if (types) {
      setTypeData(types.taskTypes.map((task) => task.name));
    }
  }, [types, type]);

  // handle change
  const handleChange = (e) => {
    if (selectedNote) {
      setSelectedNote({ ...selectedNote, [e.target.name]: e.target.value });
    }
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
      setAddType(false);
      setType('');

      dispatch(setAlert({ type: 'success', message: 'Task added successfully' }));
      await refetch();
    } catch (error) {
      dispatch(setAlert({ type: 'error', payload: error.message }));
    } finally {
      setOpen(false);
    }
  };

  // handle update
  const handleUpdate = async () => {
    try {
      await updateTask({
        variables: {
          id: selectedNote.id,
          title: selectedNote.title,
          note: selectedNote.note,
          date: selectedNote.date,
          type,
        },
      });
      setSelectedNote(null);
      setValue({
        title: '',
        note: '',
        date: '',
      });
      setAddType(false);
      setType('');

      dispatch(setAlert({ type: 'success', message: 'Task updated successfully' }));
      await refetch();
    } catch (error) {
      dispatch(setAlert({ type: 'error', payload: error.message }));
    } finally {
      setOpen(false);
    }
  };

  // handle delete
  const handleDelete = async (item) => {
    try {
      await deleteTask({
        variables: {
          id: item._id,
        },
      });

      dispatch(setAlert({ type: 'success', message: 'Task deleted successfully' }));
      await refetch();
    } catch (error) {
      dispatch(setAlert({ type: 'error', payload: error.message }));
    } finally {
      setConfirmDelete(false);
      setSelectedNote(false);
    }
  };

  // handle single note
  const handleSingleNote = (item) => {
    setNoteModal(true);
    setSelectedNote(item);
  };

  // handle edit note
  const handleEditNote = () => {
    setNoteModal(false);
    setOpen(true);
  };

  // debounce function
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSetSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    []
  );

  return (
    <Container>
      {/* confirm delete task dialog */}
      {confirmDelete && (
        <Dialog open={confirmDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent sx={{ textAlign: 'center', padding: '18px 25px' }}>
            <ErrorOutlineIcon sx={{ fontSize: 50, color: '#f8bb86' }} />
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', padding: '4px' }}>
              {'Are you sure?'}
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">This will delete the task permanently.</DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap: '12px', padding: '6px 5px 18px 5px' }}>
            <Button onClick={() => setConfirmDelete(false)} variant="outlined" sx={{ padding: '6px 16px' }}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(selectedNote)}
              autoFocus
              variant="contained"
              sx={{ color: 'white', padding: '6px 10px' }}
            >
              Yes, Delete Now
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Add task dialog */}
      {open && (
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle
            id="alert-dialog-title"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {selectedNote ? 'Edit Task' : 'Add Task'} <EditNoteIcon />
          </DialogTitle>

          <DialogContent sx={{ overflowY: 'unset' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="title"
                  sx={{ zIndex: '9999999' }}
                  value={selectedNote ? selectedNote.title : value.title}
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
                  value={selectedNote ? selectedNote.note : value.note}
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
                  value={selectedNote ? selectedNote.date : value.date}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={5}>
                {addType ? (
                  <TextField
                    label="Add new type"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                ) : (
                  <Autocomplete
                    options={typeData}
                    renderInput={(params) => (
                      <TextField {...params} label="Type" variant="outlined" fullWidth size="small" />
                    )}
                    value={type}
                    onChange={(_, value) => setType(value)}
                  />
                )}
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="add-type" onClick={() => setAddType(true)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
            <Button
              onClick={() => {
                setOpen(false);
                setAddType(false);
                setSelectedNote(null);
                setType('');
              }}
              variant="outlined"
              sx={{ padding: '5px 16px' }}
            >
              Cancel
            </Button>
            {selectedNote ? (
              <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }} onClick={() => handleUpdate()}>
                Update
              </Button>
            ) : (
              <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }} onClick={() => handleSubmit()}>
                Save
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
      {/* Open task dialog */}
      {noteModal && (
        <Dialog
          open={noteModal}
          size="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {selectedNote && (
              <Box display="flex" minHeight="200px" flexDirection="column" gap="10px" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">{selectedNote.title}</Typography>
                  <Typography variant="body2" sx={{ marginTop: '10px' }}>
                    {selectedNote.note}
                  </Typography>
                </Box>
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
                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate(`/lead/${selectedNote.lead.id}`);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {selectedNote?.lead?.firstName}
                  </Link>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
            <Button
              onClick={() => {
                setNoteModal(false);
                setSelectedNote(null);
              }}
              variant="outlined"
              sx={{ padding: '5px 16px' }}
            >
              Close
            </Button>
            <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }} onClick={handleEditNote}>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Page Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" gap="5px" marginBottom="30px">
        <Typography variant="h4">Tasks</Typography>
        <TextField
          id="search"
          type="search"
          label="Search"
          size="small"
          onChange={(e) => debouncedSetSearchValue(e.target.value)}
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
          options={typeData}
          renderInput={(params) => <TextField {...params} label="Type" variant="outlined" fullWidth size="small" />}
          value={searchType}
          onChange={(_, value) => setSearchType(value)}
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
            {(filteredTask &&
              filteredTask.length &&
              filteredTask.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Card
                    onClick={() => handleSingleNote(item)}
                    sx={{
                      padding: '20px',
                      backgroundColor: '#F9FAFB',
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      '&:hover .delete-icon': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">{item.note}</Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="5px"
                      marginTop="10px"
                      paddingRight="5px"
                      flexWrap="wrap"
                    >
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
                      <Link
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          navigate(`/lead/${item.lead.id}`);
                        }}
                      >
                        {item?.lead && item.lead.firstName}
                      </Link>
                      <IconButton
                        className="delete-icon"
                        sx={{ marginLeft: 'auto', opacity: 0, transition: 'opacity 0.3s' }}
                        aria-label="delete"
                        onClick={(event) => {
                          event.stopPropagation(); // Stop event propagation
                          setSelectedNote(item);
                          setConfirmDelete(true);
                        }}
                      >
                        <DeleteIcon sx={{ color: 'rgb(244 63 94)' }} />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))) || (
              <Typography sx={{ padding: '10px' }} variant="paragraph">
                Record is empty!
              </Typography>
            )}
          </Grid>
        )}
      </Card>
    </Container>
  );
};

export default NotesPage;
