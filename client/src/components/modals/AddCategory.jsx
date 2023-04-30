import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Alert, Snackbar } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';
import { ADD_LEAD } from '../../mutations/leadMutations';
// import {ADD_TAG} from '../../mutations/addTag';
import { ADD_CATEGORY } from '../../mutations/addCategory';
import { callContext } from '../../hooks/useCall';

export default function AddCategoryModal({ callback }) {
  const { setRefetch } = React.useContext(callContext);
  const [openSnack, setOpenSnack] = useState(false);
  const [uploadInProcess, setUploaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dateCreated: '',
  });

  const [addLead, { loading, error, data }] = useMutation(ADD_CATEGORY, {
    onCompleted: (data) => {
      console.log(data);
      setUploaded(true);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    event.persist();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    console.log(formData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    addLead({
      variables: formData,
    })
      .then((res) => {
        setFormData({
          title: '',
          dateCreated: '',
        });

        setRefetch(new Date().getTime());
        setUploaded(false);
        console.log('Lead Submitted!');
        callback();
        handleClose();
        setOpenSnack(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {uploadInProcess ? (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Category
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Category Info</DialogTitle>
            <DialogContent>
              <DialogContentText>Tell us about your new Category!</DialogContentText>

              <Box>
                <img
                  src="https://img.freepik.com/premium-vector/3d-check-mark-icon-realistic-green-tick-button-isolated-white-background-vector-illustration_113065-1285.jpg"
                  alt="CSV Upload"
                  width="200"
                  height="200"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => setUploaded(false)}>Add Lead</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Category
          </Button>
          <Dialog open={open} onClose={handleClose}>
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
                value={formData.title}
                onChange={handleChange}
              />

              {/* <TextField
autoFocus
margin="dense"
id="dateCreated"
label="Date Created"
type="text"
fullWidth
variant="standard"
name="dateCreated"
value={formData.dateCreated}
onChange={handleChange}
/>
 */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleLeadSubmit}>Add Category</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
          Tag Updated
        </Alert>
      </Snackbar>
    </>
  );
}
