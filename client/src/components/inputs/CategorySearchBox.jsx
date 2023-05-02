import { Grid, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../queries/categoryQueries';

const categories = [];

const grayColors = ['#222'];

export default function CategoryGrid(props) {
  const [categoryList, setCategoryList] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(categoryList.map(() => false));

  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);

  const handleCategoryClick = (category, index) => {
    const newToggleStatus = [...toggleStatus];
    newToggleStatus[index] = !newToggleStatus[index];
    setToggleStatus(newToggleStatus);

    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getActiveToggles = () => {
    props.remote(selectedCategories);
    return categories.filter((category, index) => toggleStatus[index]);
  };

  useEffect(() => {
    if (props?.callback) {
      refetch();
    }
  }, [props.callback]);

  useEffect(() => {
    if (data) {
      const categoyList = data.categories.map((category) => {
        return category.title;
      });

      setCategoryList(categoyList);
    }
  }, [data]);

  console.log('Active toggled buttons:', getActiveToggles());

  return (
    <Box sx={{ width: '70vw', display: 'inline-flex', overflow: 'scroll', gap: '20px' }}>
      {categoryList.map((category, index) => {
        const opacity = selectedCategories.includes(category) ? 1 : 0.5;
        return (
          <Button
            variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
            onClick={() => handleCategoryClick(category, index)}
            sx={{
              backgroundColor: grayColors[index % grayColors.length],
              whiteSpace: 'nowrap',
              minWidth: '125px',
              color: 'white',
              opacity,
              '&:hover': {
                backgroundColor: grayColors[(index + 1) % grayColors.length],
                opacity: 1,
              },
            }}
          >
            {category}
          </Button>
        );
      })}
    </Box>
  );
}
