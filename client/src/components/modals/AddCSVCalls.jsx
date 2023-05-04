import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { LoadingButton } from '@mui/lab';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';
import DataGridCSV from '../dataGrid/DataGridCSV';
import styles from './AddCSVLeadsModal.module.css';
import { ADD_CALL } from '../../mutations/addCall';

export default function AddCSVCall({ callback }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  const [addCall, { loading }] = useMutation(ADD_CALL);

  const handleUpload = async () => {
    try {
      if (!data.length) return;
      await addCall({
        variables: {
          calls: JSON.stringify(data),
        },
      });
      handleClose();
      setOpenSnack(true);
      callback();
    } catch (error) {
      console.error(error);
      handleClose();
    }
  };

  const handleChildData = (data) => {
    setData(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData([]);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Calls
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>New CSV Lead File</DialogTitle>
        <DialogContent className={styles.AddCSVLeadsModal}>
          <DialogContentText>Upload your ealert CSV file here!</DialogContentText>
          {data ? <DataGridCSV UserData={data} /> : <p>Upload a CSV file</p>}

          <Button variant="outlined" onClick={handleClickOpen}>
            <CsvUpload handleData={handleChildData} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'red' }}>
            Cancel
          </Button>
          <LoadingButton
            size="large"
            onClick={handleUpload}
            loading={loading}
            loadingPosition="end"
            variant="text"
            sx={{ width: '170px' }}
          >
            <span>Upload Calls</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
          Notes Uploaded Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
