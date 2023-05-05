// import * as React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Grid,
  Container,
  Typography,
  Button,
  Divider,
  Avatar,
  Alert,
  Snackbar,
  DialogTitle,
  Dialog,
  IconButton,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/system';
import { useMutation, useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';

import { GET_LEADS } from '../queries/leadQueries';
import { GET_NOTES } from '../queries/noteQueries';
import { GET_CALLS } from '../queries/callQueries';
import { GET_EALERTS } from '../queries/eAlertQueries';

import SnackBar from './dataGrid/SnackBar';

import ChatUI from './modals/ChatUI';
import Iconify from './iconify/Iconify';
import { callContext } from '../hooks/useCall';
import { SEND_CALL } from '../mutations/sendCall';
import SelectField from './SelectField';
import SelectTag from './SelectTag';

export default function LeadDetails({ leadDetail, handleUpdate, openModal, setOpenModal }) {
  const {
    setIsCall,
    setUserName,
    setLeadId,
    leadId,
    categories: updatedCategories,
    tags: updatedTags,
  } = useContext(callContext);

  const [isMessageModal, setIsMessageModal] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [arrayCell, setArrayCell] = useState(null);
  const theme = useTheme();

  const [sendCall] = useMutation(SEND_CALL, {
    variables: { toNumber: '9099945730', msg: 'Call', leadId },
  });

  const {
    loading: callsLoading,
    data: callsData,
    refetch: refetchCalls,
  } = useQuery(GET_CALLS, {
    variables: { leadId },
  });
  const {
    loading: ealertsLoading,
    data: ealertsData,
    refetch: refetchAlerts,
  } = useQuery(GET_EALERTS, {
    variables: { leadId },
  });
  const {
    loading: notesLoading,
    data: notesData,
    refetch: refetchNotes,
  } = useQuery(GET_NOTES, {
    variables: { leadId },
  });

  useEffect(() => {
    if (openModal) {
      (async () => {
        await refetchAlerts();
        await refetchCalls();
        await refetchNotes();
      })();
    }
  }, [openModal]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCall = async () => {
    try {
      await sendCall();
    } catch (error) {
      console.log('Error-', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>RE CRM</title>
      </Helmet>
      {/* <Button variant="outlined" onClick={() => setOpenModal(true)}>
        Profile
      </Button> */}
      <BootstrapDialog
        maxWidth={'lg'}
        onClose={() => setOpenModal(false)}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpenModal(false)}
          sx={{
            position: 'absolute',
            right: 4,
            top: 4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {leadDetail && (
          <Container maxWidth="lg" sx={{ width: '70vw', minHeight: '75vh', padding: '16px' }}>
            {isMessageModal ? (
              <ChatUI handleProfile={() => setIsMessageModal(false)} lead={leadDetail} />
            ) : (
              <Grid>
                <DialogTitle>Profile</DialogTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} lg={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar
                        src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                        sx={{ width: '8em', height: '8em', mb: 2, borderRadius: '50%' }}
                      />

                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                      >
                        <Button
                          sx={{ borderRadius: '100px' }}
                          onClick={() => {
                            setIsCall(true);
                            setUserName(leadDetail?.firstName || '');
                            setLeadId(leadDetail?.id || '');
                            window.localStorage.setItem('leadId', leadDetail?.id || '');
                            window.localStorage.setItem('isCall', true);
                            window.localStorage.setItem('userName', leadDetail?.firstName || '');
                            handleCall();
                          }}
                        >
                          <Iconify icon="eva:phone-fill" color="#18712" width={22} height={22} />
                        </Button>
                        <Button href="" sx={{ borderRadius: '100px' }} onClick={() => setIsMessageModal(true)}>
                          <Iconify icon="eva:email-fill" color="#18712" width={22} height={22} />
                        </Button>
                      </Box>

                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {leadDetail ? `${leadDetail.firstName} ${leadDetail.lastName}` : 'none'}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mb={1}>
                        {leadDetail ? leadDetail.phone : 'none'}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mb={2}>
                        {leadDetail ? leadDetail.email : 'none'}
                      </Typography>

                      <Divider />

                      <Box mt={2} sx={{}}>
                        <Typography variant="h6" fontWeight="bold" mb={1}>
                          {arrayCell != null ? arrayCell : null}
                        </Typography>

                        <Typography fontWeight={'bold'} marginTop={4}>
                          Categories
                        </Typography>
                        <SelectField
                          data={leadDetail}
                          defaultValues={leadDetail?.categoriesList?.map((x) => ({
                            title: x,
                          }))}
                          type={'categories'}
                          handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
                        />
                        <Typography fontWeight={'bold'} marginTop={4}>
                          Tags
                        </Typography>
                        <SelectTag
                          data={leadDetail}
                          defaultValues={leadDetail?.tagsList?.map((x) => ({
                            title: x,
                          }))}
                          type={'tags'}
                          handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
                        />
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={8} lg={9}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                          Lead
                        </Typography>
                        <Divider />
                        <Box
                          mt={2}
                          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'left',
                              width: '25%',
                              height: '10vh',
                            }}
                          >
                            <Typography variant="h6" fontWeight="bold">
                              Tags
                            </Typography>
                            <Typography
                              variant="body1"
                              mt={1}
                              sx={{
                                fontWeight: 'bold',
                                color: 'green',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '16px',
                              }}
                            >
                              {leadDetail?.tagsList.map((tag) => (
                                <p key={tag.id}>{tag}</p>
                              ))}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'left',
                              width: '25%',
                              height: '10vh',
                            }}
                          >
                            <Typography variant="h6" fontWeight="bold" mb={1}>
                              Categories
                            </Typography>
                            <Typography
                              variant="body1"
                              mt={1}
                              sx={{
                                fontWeight: 'bold',
                                color: 'green',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '16px',
                              }}
                            >
                              {leadDetail.categoriesList.map((tag) => (
                                <p key={tag.id}>{tag}</p>
                              ))}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                              Notes
                            </Typography>
                            {notesLoading ? (
                              <Typography variant="body1">Loading Notes...</Typography>
                            ) : notesData && notesData.notes && notesData.notes.length > 0 ? (
                              notesData.notes.map((note) => <SnackBar notes={notesData} type="Notes" />)
                            ) : (
                              <Typography variant="body1">No Notes</Typography>
                            )}
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                              Calls
                            </Typography>
                            {callsLoading ? (
                              <Typography variant="body1">Loading Calls...</Typography>
                            ) : callsData ? (
                              <SnackBar calls={callsData} type="Calls" />
                            ) : (
                              <Typography variant="body1">No Calls</Typography>
                            )}
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                              E-Alerts
                            </Typography>
                            {ealertsLoading ? (
                              <Typography variant="body1">Loading E-Alerts...</Typography>
                            ) : ealertsData ? (
                              <SnackBar alerts={ealertsData} type="E-Alerts" />
                            ) : (
                              <Typography variant="body1">No E-Alerts</Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Updated Lead!
              </Alert>
            </Snackbar>
          </Container>
        )}
      </BootstrapDialog>
    </>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
