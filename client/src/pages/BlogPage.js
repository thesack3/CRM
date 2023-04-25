
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography, Box, Snackbar , Alert} from '@mui/material';

import { useQuery, useSubscription } from '@apollo/client';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useState, useMemo } from 'react';
import { GET_LEADS, NEW_LEAD_SUBSCRIPTION } from '../queries/leadQueries';

import AddLeadModal from '../components/modals/AddLead';

import AddCategoryModal from '../components/modals/AddCategory';

import AddTagModal from '../components/modals/AddTag';

import UsersActions from '../components/UsersActions';
import AddNoteButton from '../components/modals/AddNoteButton'
import AddCSVLeadModal from '../components/modals/AddCSVLeadModal';
// @mui
import CategoryGrid from '../components/inputs/CategorySearchBox';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import TagBox from '../components/inputs/SearchTagBox';

import DataGridProCSV from '../components/dataGrid/DataGridProDash';
// ----------------------------------------------------------------------
import UserModal from '../components/modals/UserModal';
import LeadBox from '../components/inputs/SearchLead';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {

  const [open, setOpen] = React.useState(false);

  const [categories, setCategories] = useState([]);
  
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageSize , setpageSize] = useState(5);
  const [rowId, setRowId ]= useState(null)
  const [refetchCategories, setRefetchCategories]=useState('');
  const [refetchTag, setRefetchTag]=useState('')


    const remoteCategories = (categories) => {

    
      setCategories(categories);
      console.log('Remote categories!');
      console.log(categories);

      //  e.g: [New, Old, Test]
      //   SET CATEGORIES TO 

    }

    useSubscription(NEW_LEAD_SUBSCRIPTION, {
      onSubscriptionData: ({ subscriptionData }) => {
        const { newLead } = subscriptionData.data;
        setUsers((prevUsers) => [...prevUsers, newLead]);
      },
    });
 

  const { loading, error, data, refetch } = useQuery(GET_LEADS);

  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   rowLength: 100000,
  //   editable: true,
  // });

  const rows = [
    
  ];

const handleLeadChange = (lead) => {
  console.log(lead);
};



const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};




  React.useEffect(() => {

 if(data){
      console.log(data);
  const { leads } = data;
  setUsers(leads);

 }else{
    setUsers([]);
 }

   
   
    
  }, [ data ])
  const handleRefetch=async()=>{
   await refetch()
  }
  const handleRefetchCategories=()=>{
       setRefetchCategories(new Date().getTime())
  }
  const handleRefetchTag=()=>{
    setRefetchTag(new Date().getTime())
  }
  const handleClick = () => {
    setOpen(true);
  };


        const columns = useMemo(
          () => [
            {field: 'id', headerName: 'ID', width: 70,  editable: true},
            {field: 'LastName', headerName: 'Last Name', width: 70,  editable: true},
            {field: 'FirstName', headerName: 'First', width: 70,  editable: true},
            {field: 'Description', headerName: 'Last Name', width: 70,  editable: true},
            {field: 'Address', headerName: 'First', width: 70,  editable: true},
            {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  <UsersActions{...{params, rowId, setRowId}}/>},
         
       ], [rowId])

      

  return (
    <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',  alignContent: 'center'}}>
      <Helmet>
        <title> Leads </title>
      </Helmet>

      <Container sx={{ width: '100vw'}}>


      <Stack sx={{display: 'flex', flexDirection: 'row', marginTop: '20px', gap:"16px"}}> 
<AddLeadModal handleRefetch={handleRefetch}  />   

{/* // TODO PUT BACK */}
            <AddCSVLeadModal/>
            <AddTagModal callback={handleRefetchTag} />
            <AddCategoryModal callback={handleRefetchCategories} />
</Stack>

<Stack sx={{marginTop: '1em'}}>


<CategoryGrid remote={remoteCategories} callback={refetchCategories} />

</Stack>


        {/* <Stack sx={{marginTop: '0px'}} direction="row" alignItems="center" justifyContent="space-between" mb={5}> */}
            {/* <Typography variant="h4" gutterBottom>
              Tags 
            </Typography> */}

     
            {/* <AddNoteButton/> */}
            {/* <UserModal/> */}

            {/* <Grid item xs={12} sx={{ height: 100 , display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
          <TagBox  setLead={handleLeadChange} />
          </Grid> */}
              {/* </Stack> */}



              <Stack sx={{marginTop: '0px'}} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       

     
            {/* <AddNoteButton/> */}
            {/* <UserModal/> */}

            {/* <Grid item xs={12} sx={{ height: 100 , display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
          <LeadBox  setLead={handleLeadChange} />
          </Grid> */}
              </Stack>

          <Box sx={{  width: '100%', height: 'fit-content'}}>

          <DataGridProCSV  successCheck={handleClick}  Categories={categories} onRowSelectionChange={(selectedRows) => setSelectedRows(selectedRows)} 
          UserData={users}/>
          </Box>


          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '90vw', backgroundColor: 'green', color: 'white' }}>
          Updated Lead!
        </Alert>
      </Snackbar>

      </Container>
    </Box>
  );
}
