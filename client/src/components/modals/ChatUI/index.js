import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Box, FormControl, Grid, OutlinedInput, Paper, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { display } from '@mui/system';
import Iconify from '../../iconify';
import { callContext } from '../../../hooks/useCall';
import { SEND_SMS } from '../../../mutations/sendSms';
import { GET_SMS_TEXT } from '../../../queries/textQueries';
import { SEND_CALL } from '../../../mutations/sendCall';

const Item = styled(Paper)(({ theme }) => ({
  display: 'none',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Header = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
const Sender = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccf1fabf',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  maxWidth: '270px',
  minHeight: '50px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 20,
}));
const Receiver = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccf6c4ba',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  marginTop: 20,
  maxWidth: '270px',
  minHeight: '50px',
}));

const ChatUI = ({ handleProfile, lead }) => {
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const { setIsCall, setUserName, setLeadId, leadId } = useContext(callContext);
  const {
    loading: textLoading,
    data: textData,
    refetch,
  } = useQuery(GET_SMS_TEXT, {
    variables: { leadId: lead?.id },
  });
  const [sendSMS, { loading }] = useMutation(SEND_SMS, {
    variables: { toNumber: '9099945730', msg: message, leadId: lead?.id },
  });

  const [sendCall, { data, error }] = useMutation(SEND_CALL, {
    variables: { toNumber: '9099945730', msg: 'Call', leadId },
  });

  const autoGrow = (element) => {
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleSendSMS = async () => {
    try {
      await sendSMS();
      await refetch();
      setMessage('');
    } catch (error) {
      console.log(error);
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
    <Grid container spacing={3} padding={4} minHeight={'75vh'} alignItems="center" justifyContent={'center'}>
      <Grid xs={12} sx={{ backgroundColor: '#f5f7f2', height: '100%' }} padding={2} borderRadius={1.5}>
        <Header>
          <Box
            sx={{
              backgroundColor: 'transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'flex-end',
              gap: '6px',
            }}
            onClick={() => handleProfile()}
          >
            <Iconify icon="mdi:user" color="#18712" width={42} height={42} />
            <Typography fontSize={18} fontWeight={700}>
              {lead?.firstName || '-'}
            </Typography>
          </Box>
          <Button
            sx={{ borderRadius: '100px' }}
            onClick={async () => {
              setIsCall(true);
              setUserName(lead?.firstName || '');
              setLeadId(lead?.id || '');
              window.localStorage.setItem('leadId', lead?.id || '');
              window.localStorage.setItem('isCall', true);
              window.localStorage.setItem('userName', lead?.firstName || '');
              await handleCall();
            }}
          >
            <Iconify icon="eva:phone-fill" color="#18712" width={22} height={22} />
          </Button>
        </Header>
        <Grid
          style={{ backgroundColor: '#fafafa', overflowY: 'scroll', height: '45vh' }}
          marginTop={3}
          padding={2}
          borderRadius={1.5}
        >
          {textData &&
            textData?.texts?.map((item) => (
              <>
                <Grid
                  key={item.dateCreated}
                  xs={12}
                  container
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  justifyContent={'flex-end'}
                >
                  <Sender>{item.body}</Sender>
                </Grid>
                {/* <Receiver>Just one? Having seen your driving, I wouldn't be so optimistic.</Receiver> */}
              </>
            ))}
        </Grid>
        <Grid marginTop={3}>
          <textarea
            style={{
              width: '100%',
              borderRadius: '12px',
              border: 'none',
              padding: '12px',
              boxShadow: '0 0 4px #ccf1fabf',
              resize: 'none',
              minHeight: '100px',
              maxHeight: '150px',
              outline: 'none',
            }}
            onInput={autoGrow}
            autoComplete={false}
            placeholder="Write a Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Grid display={'flex'} justifyContent={'flex-end'} width={'100%'}>
            <LoadingButton
              size="medium"
              onClick={handleSendSMS}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatUI;
