import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { CircularProgress } from '@mui/material';
import { SEND_EMAIL, SEND_EMAILS } from '../../mutations/bulkEmail';
import { setAlert } from '../../redux/slice/alertSlice';

const SendEmail = ({ emailOpen, setEmailOpen, id, ids }) => {
  const dispatch = useDispatch();

  // send email mutation
  const [sendEmailToLead, { loading }] = useMutation(SEND_EMAIL);
  const [sendEmails, { loading: bulkLoading }] = useMutation(SEND_EMAILS);
  const [date, setDate] = useState(new Date());

  const [formData, setFormData] = useState({
    subject: '',
    body: '',
  });

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle email submit
  const handleSubmit = async () => {
    try {
      if (ids.length) {
        await sendEmails({
          variables: {
            ids: ids,
            subject: formData.subject,
            body: formData.body,
            date: date,
          },
        });
      } else {
        await sendEmailToLead({
          variables: {
            leadId: id,
            subject: formData.subject,
            body: formData.body,
          },
        });
      }

      setFormData({
        subject: '',
        body: '',
      });

      dispatch(setAlert({ type: 'success', message: 'Email sent successfully' }));
      // await refetch();
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: error.message }));
    } finally {
      setEmailOpen(false);
    }
  };

  return (
    <Dialog
      open={emailOpen}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        Send Email
      </DialogTitle>
      <DialogContent sx={{ overflowY: 'unset' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              size="small"
              name="subject"
              value={formData.subject}
              sx={{ zIndex: '9999999' }}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Body"
              rows={6}
              multiline
              variant="outlined"
              fullWidth
              size="small"
              value={formData.body}
              name="body"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          {ids?.length && (
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
        {loading || bulkLoading ? (
          <Box display="flex" alignItems="center">
            <span>Sending...</span>
            <Box ml={1}>
              <CircularProgress size={20} thickness={4} />
            </Box>
          </Box>
        ) : (
          <>
            <Button onClick={() => setEmailOpen(false)} variant="outlined" sx={{ padding: '5px 16px' }}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }} onClick={() => handleSubmit()}>
              Send
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SendEmail;
