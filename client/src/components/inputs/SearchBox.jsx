import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBox() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      /> */}
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
          sx={{ color: 'white',backgroundColor: 'white',borderRadius: '5px'
        }}
            {...params}
            label="Search leads"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'Isabella Rossellini', year: 1994 },
  { title: 'Emma Watson', year: 1972 },
  { title: 'Noah Centineo', year: 1974 },
  { title: 'Ava DuVernay', year: 2008 },
  { title: 'Isabella Rossellini', year: 1957 },
  { title: "Jacob Black", year: 1993 },
  { title: 'Sophia Vergara', year: 1994 },
  {
    title: 'Ethan Hawke',
    year: 2003,
  }, { title: 'Isabella Rossellini', year: 1994 },
  { title: 'Emma Watson', year: 1972 },
  { title: 'Noah Centineo', year: 1974 },
  { title: 'Ava DuVernay', year: 2008 },
  { title: 'Isabella Rossellini', year: 1957 },
  { title: "Jacob Black", year: 1993 },
  { title: 'Sophia Vergara', year: 1994 },
  {
    title: 'Ethan Hawke',
    year: 2003,
  }, { title: 'Isabella Rossellini', year: 1994 },
  { title: 'Emma Watson', year: 1972 },
  { title: 'Noah Centineo', year: 1974 },
  { title: 'Ava DuVernay', year: 2008 },
  { title: 'Isabella Rossellini', year: 1957 },
  { title: "Jacob Black", year: 1993 },
  { title: 'Sophia Vergara', year: 1994 },
  {
    title: 'Ethan Hawke',
    year: 2003,
  }, { title: 'Isabella Rossellini', year: 1994 },
  { title: 'Emma Watson', year: 1972 },
  { title: 'Noah Centineo', year: 1974 },
  { title: 'Ava DuVernay', year: 2008 },
  { title: 'Isabella Rossellini', year: 1957 },
  { title: "Jacob Black", year: 1993 },
  { title: 'Sophia Vergara', year: 1994 },
  {
    title: 'Ethan Hawke',
    year: 2003,
  }, { title: 'Isabella Rossellini', year: 1994 },
  { title: 'Emma Watson', year: 1972 },
  { title: 'Noah Centineo', year: 1974 },
  { title: 'Ava DuVernay', year: 2008 },
  { title: 'Isabella Rossellini', year: 1957 },
  { title: "Jacob Black", year: 1993 },
  { title: 'Sophia Vergara', year: 1994 },
  {
    title: 'Ethan Hawke',
    year: 2003,
  },
];