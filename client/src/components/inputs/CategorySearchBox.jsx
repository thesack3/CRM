import { Grid, Button } from '@mui/material';
import { useState } from 'react';

const categories = [
  'Hot Lead',
  'Cold Lead',
  'Category 3',
  'Category 4',
  'Category 5',
  'Category 6',
  'Category 7',
  'Category 8',
  'Category 9',
  'Category 10',
];

const grayColors = [
  '#222',
  
];

export default function CategoryGrid(props) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(categories.map(() => false));

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



  console.log('Active toggled buttons:', getActiveToggles());

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      {categories.map((category, index) => {
        const opacity = selectedCategories.includes(category) ? 1 : 0.5;
        return (
          <Grid item xs={2} key={category}>
            <Button
              variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
              onClick={() => handleCategoryClick(category, index)}
              fullWidth
              sx={{
                backgroundColor: grayColors[index % grayColors.length],
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
          </Grid>
        );
      })}
    </Grid>
  );
}
