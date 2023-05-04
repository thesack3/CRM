import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { LoadingButton } from '@mui/lab';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';
import DataGridCSV from '../dataGrid/DataGridCSV';
import styles from './AddCSVLeadsModal.module.css';
import { ADD_EALERT } from '../../mutations/eAlertMutations';

export default function AddeAlert({ callback }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  const [addEAlert, { loading }] = useMutation(ADD_EALERT);

  const handleUpload = async () => {
    try {
      if (!data.length) return;
      await addEAlert({
        variables: {
          alerts: JSON.stringify(data),
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
        Add eAlerts
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>New eAlerts File</DialogTitle>
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
            <span>Upload EAlerts</span>
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
