import React from 'react';
import { Box, FormControl, Grid, OutlinedInput, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { display } from '@mui/system';
import Iconify from '../iconify';

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
}));
const Sender = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccf1fabf',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
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
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: 20,
  maxWidth: '270px',
  minHeight: '50px',
}));

const ChatUI = ({ handleProfile }) => {
  const autoGrow = (element) => {
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight}px`;
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
              Dominiq
            </Typography>
          </Box>
        </Header>
        <Grid
          style={{ backgroundColor: '#fafafa', overflowY: 'scroll', height: '45vh' }}
          marginTop={3}
          padding={2}
          borderRadius={1.5}
        >
          <Grid xs={12} container flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'flex-end'}>
            <Sender>Hurry! I've passed my driving test!</Sender>
          </Grid>
          <Receiver>Just one? Having seen your driving, I wouldn't be so optimistic.</Receiver>
          <Receiver>What can be better than hearing someone say "I love you"?</Receiver>
          <Grid xs={12} container flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'flex-end'}>
            <Sender>Hearing a bank machine go "brr" as it deals out the cash</Sender>
          </Grid>
          <Receiver>I have something cool for you.</Receiver>
          <Grid xs={12} container flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'flex-end'}>
            <Sender>what's that</Sender>
          </Grid>
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
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatUI;
