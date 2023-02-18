import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useTheme,styled } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
 import SearchBox from '../components/inputs/SearchBox';
 import TagBox from '../components/inputs/SearchTagBox';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProfilePage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>


 {/* / ================================================== */}

    {/* Top Buttons  */}
    <Grid item xs={1} sx={{height: 50}}>

        {/* Change height or styles with XS */}
        
      <Button sx={{height: 50}}>Leads</Button>
        
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>Follow-ups</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>Drips</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>Website</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>Settings</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>Marketing</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>Reporting</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 50}}>
          <Item>xs=5</Item>
        </Grid>
 {/* / ================================================== */}
 {/* / ================================================== */}
  {/* / ================================================== */}

  {/* Lead Profile Page  */}


  <Grid item xs={1} sx={{height: 10}}>
          <Item>Leads</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 10}}>
          <Item>Follow-ups</Item>
        </Grid>
        <Grid item xs={1} sx={{height: 10}}>
          <Item>Drips</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Website</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Settings</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Marketing</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Reporting</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>

         {/* / ================================================== */}


          {/* / ================================================== */}


 {/* / ================================================== */}
  {/* Lead Profile Page  */}


        <Grid item xs={1}>
          <Item>Leads</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Follow-ups</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Drips</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Website</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Settings</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Marketing</Item>
        </Grid>
        <Grid item xs={1}>
          <Item>Reporting</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>



 {/* / ================================================== */}

 {/* /Searchg Filter tags and custom presets============================ */}

 {/* / ================================================== */}

        <Grid item xs={5}>
         <TagBox/>
        </Grid>
        <Grid item xs={5}>
          <Item>Search Filters</Item>
        </Grid>


        <Grid item xs={6}>
          <SearchBox/>
        </Grid>
        <Grid item xs={1}>
          <Item>Search</Item>
        </Grid>

   {/* / ================================================== */}


          {/* / ================================================== */}


        {/* / ================================================== */}
        <Grid item xs={1} >
          <Item>Search</Item>

        </Grid>
      
        <Box sx={{paddingLeft: 2}}>
        <SearchBox />
        </Box>



   {/* / ================================================== */}


          {/* / ================================================== */}


        {/* / ================================================== */}
        <Grid item xs={11}>
          <Item>Search Filters</Item>
        </Grid>

        <Grid item xs={3} sx={{height: 200, textAlign: 'left' }}>

        <Box  sx={{ display: 'flex', flexDirection: 'row'}}>

        <Item  sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Lead</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Category</Item>
       <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Time</Item>
          </Box>
       
        </Grid>
    
    


        <Grid item xs={2} sx={{height: 200}}>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Description</Item>

        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left', marginTop: 2}}>Lorem Ipsum Dolor sit armet, consetcor elit sed do elusmod empot inciduit ..</Item>

        </Grid>






        <Grid  item xs={7} sx={{width : 550,height: 200}}>
       <Box sx={{ display: 'flex', flexDirection: 'row'}} >

        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Follow - up</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Created</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Last Contact</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Asignees</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Searches</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Visits - Props - Favs</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Calls - Emails - Texts</Item>
        <Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>Drip</Item>
        
       </Box>

       <Box sx={{ display: 'flex', flexDirection: 'row'}}>

<Item sx={{ backgroundColor: 'light-gray', textAlign: 'left'}}>History for Willy bufford</Item>


</Box>
        </Grid>



        















          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'San Diego County', value: 400 },
                { label: 'Orange County', value: 430 },
                { label: 'Riverside County', value: 448 },
                { label: 'San Bernardino County', value: 470 },
                { label: 'Imperial County', value: 540 },
                { label: 'Los Angeles County', value: 580 },
                { label: 'Ventura County', value: 690 },
                { label: 'Santa Barbara County', value: 1100 },
                { label: 'Kern County', value: 1200 },
                { label: 'San Luis Obispo County', value: 1380 },
                // { label: 'San Luis Obispo County', value: 1380 },
                // { label: 'San Luis Obispo County', value: 1380 },
                // { label: 'San Luis Obispo County', value: 1380 },
                // { label: 'San Luis Obispo County', value: 1380 },
                // { label: 'San Luis Obispo County', value: 1380 },
                // { label: 'San Luis Obispo County', value: 1380 },
                ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="CRM Activtiy / Retention "
              chartLabels={['LEAD A', 'LEAD B', 'LEAD C', 'LEAD D', 'LEAD E', 'LEAD F']}
              chartData={[
                { name: 'Lead generation and qualification', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Listing and marketing', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Closing and follow-up', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Messages"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.findName(),
                description: faker.phone.phoneNumberFormat(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Hot Lead of the day"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Potential Lead',
                  'Qualified Lead',
                  'Scored Lead',
                  'Categorized Lead',
                  'Active Lead',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Follow up with Lead #1233' },
                { id: '2', label: 'Call Lead #1233' },
                { id: '3', label: 'Show Lead #1233 Property #346' },
                { id: '4', label: 'Backlog Lead #4' },
                { id: '5', label: 'Set Up Meeting' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}












