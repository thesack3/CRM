import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function CustomDialog({ details, open, onClose }) {

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{details?.__typename || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 0px 5px #e3e3e3',
                padding: '8px',
                marginBottom: '16px',
              }}
            >
              <Typography variant="h6" sx={{ width: '30%' }}>
                First Name:
              </Typography>
              <Typography variant="subtitle1" sx={{ width: '70%' }}>
                {details.FirstName || '-'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                boxShadow: '0px 0px 5px #e3e3e3',
                padding: '8px',
                marginBottom: '16px',
              }}
            >
              <Typography variant="h6" sx={{ width: '30%' }}>
                Last Name:
              </Typography>
              <Typography variant="subtitle1" sx={{ width: '70%' }}>
                {details.LastName || '-'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 0px 5px #e3e3e3',
                padding: '8px',
                marginBottom: '16px',
              }}
            >
              <Typography variant="h6" sx={{ width: '30%' }}>
                Buyer Agent:
              </Typography>
              <Typography variant="subtitle1" sx={{ width: '70%' }}>
                {details.BuyerAgent || '-'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 0px 5px #e3e3e3',
                padding: '8px',
                marginBottom: '16px',
              }}
            >
              <Typography variant="h6" sx={{ width: '30%' }}>
                Listing Agent:
              </Typography>
              <Typography variant="subtitle1" sx={{ width: '70%' }}>
                {details.ListingAgent || '-'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0px 0px 5px #e3e3e3',
                padding: '8px',
                marginBottom: '16px',
              }}
            >
              <Typography variant="h6" sx={{ width: '30%' }}>
                Contact Id:
              </Typography>
              <Typography variant="subtitle1" sx={{ width: '70%' }}>
                {details.contactId || '-'}
              </Typography>
            </Box>
            {details?.__typename === 'Ealert' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0px 0px 5px #e3e3e3',
                  padding: '8px',
                  marginBottom: '16px',
                }}
              >
                <Typography variant="h6" sx={{ width: '30%' }}>
                  Email Frequency:
                </Typography>
                <Typography variant="subtitle1" sx={{ width: '70%' }}>
                  {details.EmailFrequency || '-'}
                </Typography>
              </Box>
            )}
            {details?.__typename === 'Call' && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 0px 5px #e3e3e3',
                    padding: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography variant="h6" sx={{ width: '30%' }}>
                    Contact Phone ID:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '70%' }}>
                    {details.ContactPhoneID || '-'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 0px 5px #e3e3e3',
                    padding: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography variant="h6" sx={{ width: '30%' }}>
                    Call End Time:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '70%' }}>
                    {details.CallEndTime || '-'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 0px 5px #e3e3e3',
                    padding: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography variant="h6" sx={{ width: '30%' }}>
                    Associated Opportunity ID:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '70%' }}>
                    {details.AssociatedopportunityID || '-'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 0px 5px #e3e3e3',
                    padding: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography variant="h6" sx={{ width: '30%' }}>
                    Date Created:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '70%' }}>
                    {details.DateCreated || '-'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 0px 5px #e3e3e3',
                    padding: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography variant="h6" sx={{ width: '30%' }}>
                    Call Details :
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '70%' }}>
                    {details.CallDetails || '-'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 0px 5px #e3e3e3',
                    padding: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography variant="h6" sx={{ width: '30%' }}>
                    UserID :
                  </Typography>
                  <Typography variant="subtitle1" sx={{ width: '70%' }}>
                    {details.UserID || '-'}
                  </Typography>
                </Box>
              </Box>
            )}
            {details?.__typename !== 'Call' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0px 0px 5px #e3e3e3',
                  padding: '8px',
                  marginBottom: '16px',
                }}
              >
                <Typography variant="h6" sx={{ width: '30%', display: 'flex', alignItems: 'start' }}>
                  {details?.Notes ? 'Notes' : details?.SearchName ? 'Search Name' : ''}:
                </Typography>
                <Typography variant="subtitle1" sx={{ width: '70%', padding: '0 8px', wordBreak: 'break-word' }}>
                  {details.Notes || details.SearchName || '-'}
                </Typography>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
