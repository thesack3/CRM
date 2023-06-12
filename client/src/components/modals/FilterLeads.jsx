import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FilterLeads = ({ filterLeadModal, setFilterLeadModal }) => {
  return (
    <Dialog
      open={filterLeadModal}
      maxWidth="md"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ overflow: 'hidden' }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        Advanced Lead Filters{' '}
        <Button sx={{ color: 'gray' }} onClick={() => setFilterLeadModal(false)}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={{ overflowY: 'hidden' }}>
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          flexWrap="wrap"
          sx={{ borderTop: '1px solid #DADEE3', borderBottom: '1px solid #DADEE3', padding: '5px' }}
        >
          <Button sx={{ backgroundColor: '#fafafa', color: 'gray' }}>
            eAlerts <CloseIcon sx={{ height: '12px' }} />
          </Button>
        </Box>
        <Box display="flex" sx={{ borderBottom: '1px solid #DADEE3' }}>
          {/* sidebar */}
          <Box
            sx={{
              padding: '8px',
              maxHeight: '300px',
              overflowY: 'scroll',
              position: 'relative',
              flex: '.3',
              borderRight: '1px solid #DADEE3',
            }}
          >
            <Box display="flex" flexDirection="column" gap="15px">
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
              <Typography variant="content">Buyer Agent</Typography>
            </Box>
          </Box>
          {/* aside content */}
          <Box flex=".7" padding="20px">
            <Autocomplete
              options={['One', 'Two', 'Three']}
              renderInput={(params) => (
                <TextField {...params} label="Lender" variant="outlined" fullWidth size="small" />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
        <Button onClick={() => setFilterLeadModal(false)} variant="outlined" sx={{ padding: '5px 16px' }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }}>
          View Results
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterLeads;
