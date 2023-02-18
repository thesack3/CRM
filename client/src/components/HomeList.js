import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box, TextField, Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'bedrooms', headerName: 'Bedrooms', width: 120 },
  { field: 'bathrooms', headerName: 'Bathrooms', width: 120 },
  { field: 'price', headerName: 'Price', width: 120 },
];

const rows = [
  { id: 1, address: '123 Main St', bedrooms: 3, bathrooms: 2, price: '$300,000' },
  { id: 2, address: '456 Elm St', bedrooms: 4, bathrooms: 3, price: '$400,000' },
  { id: 3, address: '789 Oak St', bedrooms: 5, bathrooms: 4, price: '$500,000' },
  //  ... add more rows
];

function HomeList() {
  const [searchValue, setSearchValue] = React.useState('');
  const [bedroomFilter, setBedroomFilter] = React.useState('');
  const [bathroomFilter, setBathroomFilter] = React.useState('');
  const [priceFilter, setPriceFilter] = React.useState('');

  const filteredRows = rows.filter((row) => {
    if (searchValue) {
      return row.address.toLowerCase().includes(searchValue.toLowerCase());
    }

    if (bedroomFilter) {
      return row.bedrooms === parseInt(bedroomFilter, 10);
    }

    if (bathroomFilter) {
      return row.bathrooms === parseInt(bathroomFilter, 10);
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-');
      const price = parseInt(row.price.replace(/\D/g, ''), 10);
      return price >= parseInt(minPrice, 10) && price <= parseInt(maxPrice, 10);
    }

    return true;
  });

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBedroomChange = (event) => {
    setBedroomFilter(event.target.value);
  };

  const handleBathroomChange = (event) => {
    setBathroomFilter(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setBedroomFilter('');
    setBathroomFilter('');
    setPriceFilter('');
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          id="search-input"
          label="Search by address"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        <TextField
          id="bedroom-input"
          label="Bedrooms"
          variant="outlined"
          value={bedroomFilter}
          onChange={handleBedroomChange}
          sx={{ mr: 2 }}
        />
        <TextField
          id="bathroom-input"
          label="Bathrooms"
          variant="outlined"
          value={bathroomFilter}
          onChange={handleBathroomChange}
          sx={{ mr: 2 }}
          />
          <TextField
            id="price-input"
            label="Price"
            variant="outlined"
            value={priceFilter}
            onChange={handlePriceChange}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Box>
        <Box sx={{ height: 'calc(100% - 56px)' }}>
          <DataGridPro
            columns={columns}
            rows={filteredRows}
            pagination
            rowHeight={200}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            disableExtendRowFullWidth
          />
        </Box>
      </Box>
        
    );
    }

    export default HomeList;
    
