import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';

import { useSubscription } from '@apollo/client';
import { NEW_LEAD_SUBSCRIPTION } from '../queries/leadQueries';

import DataGridProCSV from '../components/dataGrid/DataGridProDash';
import DataGridProCSV2 from '../components/dataGrid/DataGrid2';

export default function BlogPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
      }}
    >
      <Helmet>
        <title> Leads </title>
      </Helmet>

      <Box
        sx={{
          width: '100vw',
          paddingX: {
            md: '40px',
            xs: '2px',
          },
        }}
      >
        <Box sx={{ width: '100%', height: 'fit-content' }}>
          {/* <DataGridProCSV /> */}
          <DataGridProCSV2 />
        </Box>
      </Box>
    </Box>
  );
}
