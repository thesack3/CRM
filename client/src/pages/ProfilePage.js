
import * as React from 'react';
import { useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useTheme,styled } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Select, MenuItem  } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { faker } from '@faker-js/faker';
// @mui
import { useQuery } from '@apollo/client';
 import SearchBox from '../components/inputs/SearchBox';
 import TagBox from '../components/inputs/SearchTagBox';
// components
import Iconify from '../components/iconify';
// sections
import { GET_LEADS } from '../queries/leadQueries';
import {GET_NOTES} from '../queries/noteQueries';

import SnackBar from '../components/dataGrid/SnackBar';
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



import EmailActionModal from '../components/modals/EmalActionModal';



const SelectFilter = () =>{
  

  const [filter, setFilter] = useState('email');

  const handleFilterChange = (event) =>  {
    setFilter(event.target.value);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={5}>
        <Select value={filter} onChange={handleFilterChange} sx={{ width: '100%' }}>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="phone">Phone</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="address">Address</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={5}>
        <EmailActionModal/>
     </Grid>
    </Grid>
  );
}







export default function ProfilePage() {

  const [users, setUsers] = useState([]);
  const theme = useTheme();


  const [lead, setLead] = useState();


const { loading, error, data } = useQuery(GET_LEADS);

const { Noteloading, Noteerror, Notedata } = useQuery(GET_NOTES, {
  variables: { leadId:"63f1ad64d855342f3c84d873"}

});


const [selectedLead, setSelectedLead] = useState(null);

const handleLeadChange = (lead) => {
  setSelectedLead(lead);
};
useEffect(() => {

  if(data){
       console.log(data);
   const { leads } = data;
   
   setUsers(leads);
   setLead(leads[0]);
 

   if(Notedata){
    console.log("Note Data")
     console.log(Notedata.notes)
     const {notes} = Notedata;
     console.log(notes)
   }


 
  }else{
     setUsers([]);
  }
 
    

   }, [ data , Notedata])









  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Lead Profile
        </Typography>

        <Grid container spacing={3}>

   
{/* / ================================================== */}
{/* / ================================================== */}
{/* / ================================================== */}
{/* Top Buttons */}
<Grid item xs={12} spacing={2} sx={{ height: 'fit-content' }}>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #f5e10a, #fffffc)', color: 'black' , margin: '2px', width: '150px'}}>New (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #ff9100, #fffffc)', color: 'black', margin: '2px' , width: '150px'}}>New (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #ff6200, #fffffc)', color: 'black' , margin: '2px', width: '150px'}}>New (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #ff0800, #fffffc)', color: 'black' , margin: '2px', width: '150px'}}>Hot (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #ff3700, #fffffc)', color: 'black' , margin: '2px', width: '150px'}}>Hot (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #1aff00, #fffffc)', color: 'black' , margin: '2px', width: '120px'}}>Qualify (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #007d06, #fffffc)', color: 'black' , margin: '2px', width: '120px'}}>Qualify (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #00ffcc, #fffffc)', color: 'black' , margin: '2px', width: '120px'}}>Nurture (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #0088ff, #fffffc)', color: 'black' , margin: '2px', width: '120px'}}>Nurture (talked to)</Button>
  <Button sx={{ height: 80, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #002c52, #fffffc)', color: 'black' , margin: '2px', width: '120px'}}>Nurture (talked to)</Button>

</Grid>




<Grid item xs={12}  spacing={2} sx={{ height: 'fit-content'}}>


<Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #542c9e, #fffffc)', color: 'black' , margin: '2px'}}>Unlikely (unresponsive)</Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #872c9e, #fffffc)', color: 'black', margin: '2px' }}>Unlikely (unresponsive)</Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #340440, #fffffc)', color: 'black' , margin: '2px'}}>Unlikely (unresponsive)</Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #402204, #fffffc)', color: 'black' , margin: '2px'}}>Unlikely (unresponsive)</Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #ab5e11, #fffffc)', color: 'black' , margin: '2px'}}>Unlikely (unresponsive)</Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #de57c3, #fffffc)', color: 'black' , margin: '2px'}}> Pending </Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #00fcc6, #fffffc)', color: 'black' , margin: '2px'}}> Closed </Button>
  <Button sx={{ height: 50, fontSize: '1rem', borderRadius: 2, backgroundColor: 'white', backgroundImage: 'linear-gradient(to bottom right, #000000, #000000)', color: 'white' , margin: '2px'}}> Trash </Button>

  </Grid>



{/* ================================================================================================================================================================================================================================================================================ */}






{/* / ================================================== */}

{/* / ================================================== */}
{/* Search Filter tags and custom presets============================ */}
<Grid item xs={12} sx={{ height: 100 , display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
<TagBox  setLead={handleLeadChange} />
<SelectFilter/>
</Grid>

{/* <Grid item xs={12} sx={{ height: 'fit-content' , display: 'flex', justifyContent: 'left', alignContent: 'center', backgroundColor: 'red'}}>
<SearchBox />
</Grid>
 */}


<Grid item xs={12} sx={{ height: 'fit-content' , display: 'flex',justifyContent: 'center', alignContent: 'center'}}>
  <Box  sx={{width: '100%' , display: 'flex', flexDirection: 'row'}}> 
  

  {/* LEAD INFO  */}

  <Box sx={{width: '350px' }}>
  <p style={{fontWeight: 'bold'}}>
    Lead
  </p>
  <hr color='black'/>
  <p style={{fontWeight: 'bold'}}>
    {lead ? lead.firstName : 'none'}
  </p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
 
  {lead ? lead.phone : 'none'}
  </p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
  {lead ? lead.email : 'none'}
  </p>
</Box>

<Box sx={{width: '220px',  marginLeft: '1px'}}>
  <p style={{fontWeight: 'bold'}}>
    Category/ Time
  </p>
  <hr color='black'/>
  <p>Selected Lead: {selectedLead ? selectedLead.email : 'none'}</p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
    (555)555-5555
  </p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
    annapappadupoila@flastrarconnectusa.com
  </p>
</Box>

<Box sx={{width: '350px', marginLeft: '1px'}}>
  <p style={{fontWeight: 'bold'}}>
    Description
  </p>
  <hr color='black'/>
  <p>Selected Lead: {selectedLead ? selectedLead.email : 'none'}</p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
    (555)555-5555
  </p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
    annapappadupoila@flastrarconnectusa.com
  </p>
</Box>

<Box sx={{width: '350px', marginLeft: '1px'}}>
  <p style={{fontWeight: 'bold'}}>
    Lead
  </p>
  <hr color='black'/>
  <p>Selected Lead: {selectedLead ? selectedLead.email : 'none'}</p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
    (555)555-5555
  </p>
  <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
    annapappadupoila@flastrarconnectusa.com
  </p>
</Box>


  


  </Box>



</Grid>




{/* / ================================================== */}
<Grid item xs={12} md={6} lg={4}>

<AppTasks
              title="To Do"
              list={[
                { id: '1', label: 'Follow up with Lead #1233' },
                { id: '2', label: 'Call Lead #1233' },
      
              ]}
            />


  <h1>
      History
  </h1>



<SnackBar/>

<h1>
      Notes
  </h1>

  {Noteloading ? "Loading Notes..." : (Notedata ? "Got Notes" : "No Notes")}

<SnackBar/>


</Grid>
    
          <Grid item xs={12} md={8} lg={8}>
          <AppCurrentVisits
              title="Distribution"
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


            <Box sx={{display:"flex", flexDirection: "row"}}>
            <Box sx={{width: '45%', marginLeft: '10px'}}>
                <h1>
      Messages
  </h1>

<SnackBar/>
 
              </Box>

              <Box sx={{width: '45%', marginLeft: '10px'}}>
                <h1>
      E-Alerts
  </h1>


<SnackBar/>
              </Box>
     

            </Box>
    
          </Grid>

       
        </Grid>
      </Container>
    </>
  );
}












