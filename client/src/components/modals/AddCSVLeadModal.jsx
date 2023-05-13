import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';
import DataGridCSV from '../dataGrid/DataGridCSV';
import styles from './AddCSVLeadsModal.module.css';
import { ADD_LEAD, ADD_LEADS_CSV } from '../../mutations/leadMutations';

export default function AddCSVLeadModal({ callback }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  const [addLeadsCsv, { loading, error }] = useMutation(ADD_LEADS_CSV);

  const handleUpload = async () => {
    try {
      if (!data.length) return;
      await addLeadsCsv({
        variables: {
          leads: JSON.stringify(data),
        },
      });
      setOpenSnack(true);
      handleClose();
      callback();
    } catch (error) {
      console.log(error);
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
    setData(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Lead CSV
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle textAlign={'center'}>New CSV Lead File</DialogTitle>
        <DialogContent className={styles.AddCSVLeadsModal}>
          <DialogContentText>Upload your lead CSV file here!</DialogContentText>

          {data ? <DataGridCSV UserData={data} /> : <p>Upload a CSV file</p>}

          <Button variant="outlined" onClick={handleClickOpen}>
            <CsvUpload handleData={handleChildData} />
          </Button>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose} sx={{ color: 'red' }}>
            Cancel
          </Button>
          <LoadingButton
            size="large"
            onClick={handleUpload}
            loading={loading}
            loadingPosition="end"
            variant="text"
            sx={{ width: '160px' }}
          >
            <span>Upload Leads</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
          Csv Updated
        </Alert>
      </Snackbar>
    </div>
  );
}
