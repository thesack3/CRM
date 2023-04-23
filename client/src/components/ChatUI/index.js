import React from 'react';
import { Box, FormControl, Grid, OutlinedInput, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { display } from '@mui/system';

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
  fontWeight: 700,
  height: 70,
  display: 'flex',
  alignItems: 'center',
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
  marginTop: 16,
}));
const Receiver = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ccf6c4ba',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: 16,
  maxWidth: '270px',
  minHeight: '50px',
}));

const ChatUI = () => {
  const autoGrow = (element) => {
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <Grid container spacing={3} padding={4} minHeight={'75vh'} alignItems="center">
      <Grid item xs={2}>
        <Item />
      </Grid>
      <Grid xs={7} sx={{ backgroundColor: '#f5f7f2', height:'100%' }} padding={2} borderRadius={1.5}>
        <Header>
          Dominiq
          {/* <Typography>Dominiq</Typography> */}
        </Header>
        <Grid style={{ backgroundColor: '#fafafa' }} marginTop={3} padding={2} borderRadius={1.5}>
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
              minHeight: '50px',
              maxHeight: '150px',
              outline: 'none',
            }}
            onInput={autoGrow}
            autoComplete={false}
            placeholder="Write a Message"
          />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Item />
      </Grid>
    </Grid>
  );
};

export default ChatUI;
