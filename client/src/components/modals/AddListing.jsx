import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';

export default function AddLisingModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
       Add Lisitng
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Lead Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tell us about your new lead!
          </DialogContentText>


          {/* <Button variant="outlined" onClick={handleClickOpen}>
      {CsvUpload()}
      </Button> */}
      
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Homeowner Name"
            type="email"
            fullWidth
            variant="standard"
          />

<TextField
            autoFocus
            margin="dense"
            id="name"
            label="Home Address"
            type="email"
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Publish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}