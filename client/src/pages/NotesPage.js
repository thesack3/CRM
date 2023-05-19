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

const NotesPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      {/* Add task dialog */}
      {open && (
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle
            id="alert-dialog-title"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {'Add Task'} <EditNoteIcon />
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Title" variant="outlined" fullWidth size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Take a note" rows={4} multiline variant="outlined" fullWidth size="small" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={['Personal', 'Family', 'Work', 'Frinds', 'Priority']}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" variant="outlined" fullWidth size="small" />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap: '5px', padding: '6px 5px 18px 5px' }}>
            <Button onClick={() => setOpen(false)} variant="outlined" sx={{ padding: '6px 10px' }}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#00bfa5', color: 'white', padding: '6px 10px' }}>
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
