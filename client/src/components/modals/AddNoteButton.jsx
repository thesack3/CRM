import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ADD_NOTE } from '../../mutations/noteMutations';

export default function AddNoteButton() {
  const [formData, setFormData] = useState({
    contactId: '',
    firstName: '',
    lastName: '',
    notes: '',
    buyerAgent: '',
    listingAgent: '',
    leadId: '',
  });

  const [addNote, { loading, error, data }] = useMutation(ADD_NOTE);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    addNote({
      variables: {
        contactId: formData.contactId,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Notes: formData.notes,
        BuyerAgent: formData.buyerAgent,
        ListingAgent: formData.listingAgent,
        leadId: '63f1ad64d855342f3c84d873'
      },
    })
    .then((res) => {
      setFormData({
        contactId: '',
        lastName: '',
        firstName: '',
        notes: '',
    buyerAgent: '',
    listingAgent: '',
    leadId: ''
        // ...rest of the form fields
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
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
        Add Note
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new note:</DialogContentText>

          <form onSubmit={handleSubmit}>
            <TextField
              id="contactId"
              label="Contact ID"
              name="contactId"
              value={formData.contactId}
              onChange={handleChange}
              fullWidth
            />
                    <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="firstName"
              label="Note"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
        
            <TextField
              id="notes"
              label="Description"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
            />
        
            <TextField
              id="buyerAgent"
              label="Buyer Agent"
              name="buyerAgent"
              value={formData.buyerAgent}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="listingAgent"
              label="Listing Agent"
              name="listingAgent"
              value={formData.listingAgent}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="leadId"
              label="Lead ID"
              name="leadId"
              value={formData.leadId}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Saving...' : 'Save Note'}
                </Button>
        </Box>
      </form>

    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} sx={{ color: "red" }}>
        Cancel
      </Button>

    </DialogActions>
  </Dialog>
</div>
  );}