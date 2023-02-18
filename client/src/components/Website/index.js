import React from 'react';
import { Box, Typography, Button , Grid , TextField} from '@mui/material';

function Website() {
  return (
    <Box sx={{ height: '100vh', backgroundImage: 'url("https://robertelliotthomes.com/wp-content/uploads/2020/11/Luxury-homes-in-Dallas.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
      <Grid item xs={12} md={6} lg={4}>
        <Box sx={{ p: 3, mb: 3, borderRadius: 4, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>Find your dream home</Typography>
          <TextField id="search-input" label="Search" variant="outlined" fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" sx={{ mb: 2, borderRadius: 32, padding: '16px 32px', fontWeight: 'bold' }}>Search</Button>
          <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: 4, p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Filters</Typography>
            <TextField id="bedroom-input" label="Bedrooms" variant="outlined" fullWidth sx={{ mb: 2 }} />
            <TextField id="bathroom-input" label="Bathrooms" variant="outlined" fullWidth sx={{ mb: 2 }} />
            <TextField id="price-input" label="Price" variant="outlined" fullWidth sx={{ mb: 2 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
  );
}

export default Website;

