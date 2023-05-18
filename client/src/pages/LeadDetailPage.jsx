import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Typography,
  Avatar,
  styled,
  alpha,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { TimelineConnector, TimelineDot, TimelineSeparator } from '@mui/lab';
import account from '../_mock/account';
import Iconify from '../components/iconify';
import styles from '../Styles/Messages.module.css';
import SelectField from '../components/SelectField';
import { GET_LEAD } from '../queries/leadQueries';
import { GET_CALLS } from '../queries/callQueries';
import { GET_NOTES } from '../queries/noteQueries';
import { GET_SMS_TEXT } from '../queries/textQueries';
import { GET_EALERTS } from '../queries/eAlertQueries';
import { fDateTime } from '../utils/formatTime';
import CustomDialog from '../components/modals/CustomDialog';
import SelectTag from '../components/SelectTag';
import { updateLeadMutation } from '../mutations/leadMutations';
import ChatUI from '../components/modals/ChatUI';
import { SEND_CALL } from '../mutations/sendCall';
import { callContext } from '../hooks/useCall';

const LeadDetailPage = () => {
  const param = useParams();
  const { id } = param;
  const { setIsCall, setUserName, setLeadId } = useContext(callContext);

  // call single lead query
  const { data, loading, error } = useQuery(GET_LEAD, {
    variables: { id },
  });
  const { data: calls, loading: callLoading } = useQuery(GET_CALLS, {
    variables: { leadId: id },
  });
  const { data: notes, loading: noteLoading } = useQuery(GET_NOTES, {
    variables: { leadId: id },
  });
  const { data: texts, loading: textLoading } = useQuery(GET_SMS_TEXT, {
    variables: { leadId: id },
  });
  const { data: emails, loading: emailLoading } = useQuery(GET_EALERTS, {
    variables: { leadId: id },
  });
  const [updateLead] = useMutation(updateLeadMutation);
  const [sendCall] = useMutation(SEND_CALL, {
    variables: { toNumber: data?.lead?.phone || '', msg: 'Call', leadId: id },
  });

  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMessageModal, setIsMessageModal] = useState(false);
  const [confirmCall, setConfirmCall] = useState(false);

  useEffect(() => {
    if (data?.lead?.description) {
      setDescription(data?.lead?.description);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const getSelected = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleUpdate = async (values, id, type) => {
    const entries = values?.map((x) => x.title);
    if (type === 'categories') {
      await updateLead({
        variables: {
          id,
          categoriesList: entries,
        },
      });
    }
    if (type === 'tags') {
      await updateLead({
        variables: {
          id,
          tagsList: entries,
        },
      });
    }
  };

  const handleCall = async () => {
    try {
      await sendCall();
    } catch (error) {
      console.log('Error-', error);
    }
  };

  return (
    <Grid sx={{ overflow: 'hidden' }}>
      {isMessageModal && data?.lead && (
        <Dialog
          open={isMessageModal}
          onClose={() => setIsMessageModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth
        >
          <ChatUI handleProfile={() => setIsMessageModal(false)} lead={data?.lead} />
        </Dialog>
      )}
      {/* Call confirmation dialog */}
      {confirmCall && (
        <Dialog
          open={confirmCall}
          onClose={() => setConfirmCall(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent sx={{ textAlign: 'center', padding: '18px 25px' }}>
            <ErrorOutlineIcon sx={{ fontSize: 50, color: '#f8bb86' }} />
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', padding: '4px' }}>
              {'Are you sure?'}
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">This will make a call if you press yes.</DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap:"12px", padding: '6px 5px 18px 5px' }}>
            <Button onClick={() => setConfirmCall(false)} variant="outlined" sx={{ padding: '6px 16px' }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setConfirmCall(false);
                setIsCall(true);
                setUserName(data?.lead?.firstName || '');
                setLeadId(id || '');
                window.localStorage.setItem('leadId', id || '');
                window.localStorage.setItem('isCall', true);
                window.localStorage.setItem('userName', data?.lead?.firstName || '');
                handleCall();
              }}
              autoFocus
              variant="contained"
              sx={{ backgroundColor: '#00bfa5', color: 'white', padding: '6px 10px' }}
            >
              Yes, Call Now
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Grid container margin="24px">
        <Grid item xs={11.1}>
          <StyledAccount>
            <Avatar sx={{ width: '100px', height: '100px' }} src={account.photoURL} alt="photoURL" />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                {data?.lead?.firstName} {data?.lead?.lastName}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                {data?.lead?.email}
              </Typography>
            </Box>
            <Box display="flex" sx={{ width: '225px' }}>
              <Button
                href=""
                className={styles.callButtonV2}
                onClick={() => {
                  setConfirmCall(true);
                }}
              >
                <Iconify icon="eva:phone-fill" color="#18712" width={22} height={22} />
              </Button>
              <Button href="" className={styles.callButtonV2} onClick={() => setIsMessageModal(true)}>
                <Iconify icon="eva:email-fill" color="#18712" width={22} height={22} />
              </Button>
            </Box>
          </StyledAccount>
        </Grid>
        <Grid container spacing={2} marginTop={'24px'}>
          <Grid item xs={12} md={6} lg={4}>
            <StyledTextArea>
              <textarea
                // eslint-disable-next-line no-unneeded-ternary
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e3e3e3',
                  resize: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '10px',
                  backgroundColor: '#edeff1',
                  borderRadius: '9px',
                }}
                placeholder="Description.."
              />
            </StyledTextArea>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <WrapSelectable>
              <Typography fontWeight={'bold'}>Categories</Typography>
              {(data && data.lead && (
                <SelectField
                  data={data?.lead}
                  defaultValues={data?.lead?.categoriesList?.map((x) => ({
                    title: x,
                  }))}
                  type={'categories'}
                  handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
                />
              )) ||
                ''}
            </WrapSelectable>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <WrapSelectable>
              <Typography fontWeight={'bold'}>Tags</Typography>
              {(data && data.lead && (
                <SelectTag
                  data={data?.lead}
                  defaultValues={data?.lead?.tagsList?.map((x) => ({
                    title: x,
                  }))}
                  type={'tags'}
                  handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
                />
              )) ||
                ''}
            </WrapSelectable>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <Grid container spacing={2} columnGap={2} margin="42px">
            <Grid
              item
              xs={6}
              md={4}
              lg={2.7}
              sx={{
                boxShadow: '0 0 12px #e3e3e3',
                borderRadius: '12px',
                border: '1px solid #e3e3e3',
                padding: '16px',
                maxHeight: '500px',
                overflowY: 'scroll',
              }}
            >
              <Typography variant="h5" sx={{ color: 'text.primary', marginBottom: '10px' }}>
                Calls
              </Typography>
              {(calls &&
                calls?.calls?.length &&
                calls?.calls?.map((call) => <Card data={call} getItem={(item) => getSelected(item)} type="call" />)) ||
                'Call history is empty'}
            </Grid>
            <Grid
              item
              xs={6}
              md={4}
              lg={2.6}
              sx={{
                boxShadow: '0 0 12px #e3e3e3',
                borderRadius: '12px',
                padding: '16px',
                maxHeight: '500px',
                overflowY: 'scroll',
                border: '1px solid #e3e3e3',
              }}
            >
              <Typography variant="h5" sx={{ color: 'text.primary', marginBottom: '10px' }}>
                Email
              </Typography>
              {(emails &&
                emails?.ealerts?.length &&
                emails?.ealerts?.map((email) => (
                  <Card data={email} getItem={(item) => getSelected(item)} type="email" />
                ))) ||
                'Email history is empty'}
            </Grid>
            <Grid
              item
              xs={6}
              md={4}
              lg={2.6}
              sx={{
                boxShadow: '0 0 12px #e3e3e3',
                borderRadius: '12px',
                padding: '16px',
                maxHeight: '500px',
                overflowY: 'scroll',
                border: '1px solid #e3e3e3',
              }}
            >
              <Typography variant="h5" sx={{ color: 'text.primary', marginBottom: '10px' }}>
                Texts
              </Typography>
              {(texts &&
                texts.texts.length &&
                texts?.texts.map((text) => <Card data={text} getItem={(item) => getSelected(item)} type="text" />)) ||
                'Text history is empty'}
            </Grid>

            <Grid
              item
              xs={6}
              md={4}
              lg={2.6}
              sx={{
                boxShadow: '0 0 12px #e3e3e3',
                borderRadius: '12px',
                padding: '16px',
                maxHeight: '500px',
                overflowY: 'scroll',
                border: '1px solid #e3e3e3',
              }}
            >
              <Typography variant="h5" sx={{ color: 'text.primary', marginBottom: '10px' }}>
                Notes
              </Typography>
              {(notes &&
                notes.notes.length &&
                notes?.notes.map((note) => <Card data={note} getItem={(item) => getSelected(item)} type="note" />)) ||
                'Note history is empty'}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {selectedItem && <CustomDialog open={open} onClose={handleClose} details={selectedItem} />}
    </Grid>
  );
};

export default LeadDetailPage;

const Card = ({ data, getItem, type }) => {
  return (
    <Box
      sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }}
      onClick={() => getItem(data)}
    >
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <TimelineSeparator>
          <TimelineDot
            sx={{ margin: '6px 0' }}
            color={
              // disable eslint
              // eslint-disable-next-line no-nested-ternary
              type === 'note'
                ? 'primary'
                : type === 'call'
                ? 'success'
                : type === 'email'
                ? 'info'
                : type === 'text'
                ? 'secondary'
                : ''
            }
          />
          <TimelineConnector />
        </TimelineSeparator>
        <Box>
          <Typography variant="subtitle2"> {data?.FirstName}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {fDateTime(new Date().getTime())}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const StyledAccount = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid #e3e3e3',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
const StyledTextArea = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  width: '100%',
  height: '150px',
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const WrapSelectable = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'space-between',
  border: '1px solid #e3e3e3',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 2.5),
  width: '100%',
  height: '150px',
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
