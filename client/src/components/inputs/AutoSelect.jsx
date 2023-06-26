import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function AutoSelect({ title, data, defaultValues, callback }) {
  return (
    <Stack spacing={2}>
      <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={data?.length && data}
        getOptionLabel={(option) => option}
        defaultValue={defaultValues}
        renderInput={(params) => <TextField {...params} label={title || ''} placeholder={`Select ${title || ''}`} />}
        onChange={(e, selectedValue) => callback(selectedValue)}
      />
    </Stack>
  );
}
