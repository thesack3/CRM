import WaveSurfer from 'wavesurfer.js';
import React, { useContext, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { callContext } from '../../hooks/useCall';
import Iconify from '../iconify';

const Header = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const CallBox = () => {
  const {userName ,setIsCall } = useContext(callContext);

  const waveformRef = useRef();

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
      });
      wavesurfer.load('https://actions.google.com/sounds/v1/science_fiction/creature_distortion_white_noise.ogg');
    }
  }, []);

  return (
    <Grid
      sx={{
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        boxShadow: '0px 0px 5px #d3d3d3',
        width: '300px',
        height: '120px',
        position: 'fixed',
        top: '70px',
        right: '14px',
        zIndex: '1500',
        // padding: ,
      }}
    >
      <Header>
        <Box
          sx={{
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'flex-end',
            gap: '6px',
          }}
          // onClick={() => handleProfile()}
        >
          <Iconify icon="mdi:user" color="#18712" width={36} height={36} />
          <Typography fontSize={18} fontWeight={600} marginTop={1}>
            {userName || 'dd'}
          </Typography>
        </Box>
        <Button
          color="secondary"
          sx={{ borderRadius: '100px', marginTop: '5px' }}
          onClick={() => {
            window.localStorage.setItem('isCall', false);
            setIsCall(false);
          }}
        >
          <Iconify icon="material-symbols:phone-missed-rounded" color="#000" width={22} height={22} />
        </Button>
      </Header>
      <Grid ref={waveformRef} />
    </Grid>
  );
};

export default CallBox;
