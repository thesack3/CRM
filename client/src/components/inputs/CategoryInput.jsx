import { Grid, Button, Box } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../queries/categoryQueries';
import { callContext } from '../../hooks/useCall';

const grayColors = ['#222'];

export default function CategoryInput({ category, activeCategories, handleActiveCategory }) {
  const handleCategoryClick = (category) => {
    handleActiveCategory(category.title);
  };

  return (
    <Button
      variant={activeCategories?.includes(category.title) ? 'contained' : 'outlined'}
      onClick={() => handleCategoryClick(category)}
      sx={{
        backgroundColor: category?.color || '',
        whiteSpace: 'nowrap',
        minWidth: '125px',
        maxWidth: '100%',
        color: 'black',
        opacity: activeCategories?.includes(category.title) ? 1 : 1,
        '&:hover': {
          backgroundColor: category?.color || '',
          opacity: 1,
          color: 'white',
        },
      }}
    >
      {category?.title}
    </Button>
  );
}
