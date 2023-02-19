
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';

import { useQuery, useSubscription } from '@apollo/client';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useState, useMemo } from 'react';
import { GET_LEADS, NEW_LEAD_SUBSCRIPTION } from '../queries/leadQueries';

import AddLeadModal from '../components/modals/AddLead';
import UsersActions from '../components/UsersActions';
// @mui
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

import DataGridProCSV from '../components/dataGrid/DataGridProDash';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {

  const [users, setUsers] = useState([]);

    const [pageSize , setpageSize] = useState(5);
    const [rowId, setRowId ]= useState(null)



    useSubscription(NEW_LEAD_SUBSCRIPTION, {
      onSubscriptionData: ({ subscriptionData }) => {
        const { newLead } = subscriptionData.data;
        setUsers((prevUsers) => [...prevUsers, newLead]);
      },
    });
 

  const { loading, error, data } = useQuery(GET_LEADS);

  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   rowLength: 100000,
  //   editable: true,
  // });

  const rows = [
    
  ];




  React.useEffect(() => {

 if(data){
      console.log(data);
  const { leads } = data;
  setUsers(leads);

 }else{
    setUsers([]);
 }

   
   
    
  }, [ data ])

  

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
    <>
      <Helmet>
        <title> Leads </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>

      <AddLeadModal/>

        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>




<DataGridProCSV  UserData={users}/>







      {/* // Blog posts */}



        {/* <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}








      </Container>
    </>
  );
}
