
import * as React from 'react';
import { useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import { Grid, Container, Typography, Button, Select, MenuItem  } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/system';
import { useQuery } from '@apollo/client';
// sections
import { GET_LEADS } from '../../queries/leadQueries';
import {GET_NOTES} from '../../queries/noteQueries';
import { GET_CALLS } from '../../queries/callQueries';
import { GET_EALERTS } from '../../queries/eAlertQueries';

import TagBox from '../inputs/SearchTagBox';
import SnackBar from '../dataGrid/SnackBar';
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
} from '../../sections/@dashboard/app';

import AddNote from '../modals/AddNote';


import EmailActionModal from '../modals/EmalActionModal';



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







export default function ProfileP({rowId}) {

  const [users, setUsers] = useState([]);

  const theme = useTheme();

  const [lead, setLead] = useState();
  const [selectedLead, setSelectedLead] = useState(null);

  const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);
  // const { loading: notesLoading, error: notesError, data: notesData } = useQuery(GET_NOTES);


  const { loading: callsLoading, error: callsError, data: callsData } = useQuery(GET_CALLS, {
    variables: { leadId: selectedLead ? selectedLead.id : null },
    skip: !selectedLead,
  });

  const { loading: ealertsLoading, error: ealertsError, data: ealertsdata } = useQuery(GET_EALERTS, {
    variables: { leadId: selectedLead ? selectedLead.id : null },
    skip: !selectedLead,
  });

  const { loading: notesLoading, error: notesError, data: notesData } = useQuery(GET_NOTES, {
    variables: { leadId: selectedLead ? selectedLead.id : null },
    skip: !selectedLead,
  });

  const handleLeadChange = (lead) => {
    setSelectedLead(lead);
  };
  

  useEffect(() => {
    if (leadsData) {
      // alert("Lead Data");
      console.log(leadsData);
      const { leads } = leadsData;
      setUsers(leads);
      setLead(leads[rowId]);
      setSelectedLead(leads[rowId]);


      if(notesData){
        // alert("Notes Data");
        console.log(notesData);
      }
      if (callsData) {
        // alert("Calls Data");
        console.log(callsData);
      }
      if (ealertsdata) {
        // alert("EAlerts Data");
        console.log(ealertsdata);
      }








    } else {
      setUsers([]);
    }
  }, [selectedLead]);




  return (
    <>
      <Helmet>
        <title> RE CRM </title>
      </Helmet>

      <Container maxWidth="xl" >
  
        <Grid container spacing={3} sx={{height: 'fit-content', paddingBottom: '10em'}} >

   






<Grid item xs={12} sx={{ height: 'fit-content' , display: 'flex',justifyContent: 'center', alignContent: 'center'}}>
  <Box  sx={{width: '100%' , display: 'flex', flexDirection: 'row'}}> 
  

  {/* LEAD INFO  */}

  <Box sx={{width: '150px' }}>
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
  {lead ? lead.id : 'none'}
  </p>
</Box>

<Box sx={{width: '120px',  marginLeft: '5px'}}>
  <p style={{fontWeight: 'bold'}}>
    Category/ Time
  </p>
  <hr color='black'/>
  <p>10-02-2023 10:00 AM
  </p>
</Box>

<Box sx={{width: '450px', marginLeft: '5px'}}>
  <p style={{fontWeight: 'bold'}}>
    Description
  </p>

  <hr color='black'/>
  {lead ? lead.description : 'none'}
</Box>


  


  </Box>



</Grid>



<Grid item xs={4} md={4} lg={4} sx={{display: 'flex-direction', justifyContent: 'center'}}>




<h3>
      Notes
  </h3>
  {/* {selectedLead ? selectedLead.id : null} */}

  {notesLoading ? "Loading Notes..." : (notesData && notesData.notes && notesData.notes.length > 0 ? (
  notesData.notes.map((note) => (
    <SnackBar notes={notesData} type={"Notes"}/>
  
  ))
) : "No Notes")}





</Grid>


<Grid item xs={4} md={4} lg={4} sx={{display: 'flex-direction', justifyContent: 'center'}}>

    <h3>
                Calls
            </h3>

      {callsLoading ? "Loading Notes..." : (callsData  ? (
  
        <SnackBar calls={callsData} type={"Notes"}/>

   
    ) : "No Notes")}





</Grid>





<Grid item xs={4} md={4} lg={4} sx={{display: 'flex-direction', justifyContent: 'center'}}>

<h3>
                E-Alerts
              </h3>
              {ealertsLoading ? "Loading Ealerts..." : (ealertsdata  ? (
  
             <SnackBar alerts={ealertsdata} type={"Notes"}/>


) : "No E-lerts")}





</Grid>





    
          <Grid item xs={5} md={4} lg={4}>

            {/* <p>type </p>
          <AppCurrentVisits
              title="Distribution"
              chartData={[
                { label: '$300s', value: 4344 },
                { label: '$400s', value: 5435 },
                { label: '$500s', value: 1443 },
                { label: '$600s', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            /> */}


    
          </Grid>



       
        </Grid>
      </Container>
    </>
  );
}












