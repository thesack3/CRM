
// import * as React from 'react';
import React, { useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import { Grid, Container, Typography, Button, Select, MenuItem, Divider, Avatar , Alert, Snackbar } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/system';
import { useQuery } from '@apollo/client';
import CategoryGrid from '../inputs/CategorySearchBox';

// sections
import { GET_LEADS } from '../../queries/leadQueries';
import {GET_NOTES} from '../../queries/noteQueries';
import { GET_CALLS } from '../../queries/callQueries';
import { GET_EALERTS } from '../../queries/eAlertQueries';

import TagBoxView from '../inputs/SearchTagBoxView';
import CategoryBoxView from '../inputs/SearchCategory';
import SnackBar from '../dataGrid/SnackBar';
import CallModal from '../modals/CallModal';
import MessageModal from '../modals/Message';


import EmailActionModal from '../modals/EmalActionModal';



export default function ProfileP({ rowId }) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [users, setUsers] = useState([]);
  const [lead, setLead] = useState();
  const [selectedLead, setSelectedLead] = useState(null);
  
  const [arrayCell, setArrayCell] = useState(null);
  const theme = useTheme();
  
  const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);



  const { loading: callsLoading, error: callsError, data: callsData } = useQuery(GET_CALLS, {
    variables: { leadId: selectedLead ? selectedLead.id : null },
    skip: !selectedLead,
  });



  const { loading: ealertsLoading, error: ealertsError, data: ealertsData } = useQuery(GET_EALERTS, {
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


  const done = () => {

    console.log("updatedLead");


  }
  useEffect(() => {
    if (leadsData) {
      const { leads } = leadsData;
      setUsers(leads); 
      setLead(leads[rowId]);
      setSelectedLead(leads[rowId]);
    } else {
      setUsers([]);
    }
  }, [selectedLead]);
  
  useEffect(() => {
    if (lead) {
      setLead((prevLead) => ({ ...prevLead, ...lead }));
    }
  }, [lead]);
  
  
  return (
    <>
      <Helmet>
        <title>RE CRM</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ width:'70vw', paddingBottom: '10em' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" sx={{ width: '8em', height: '8em', mb: 2, borderRadius: '50%' }} />


<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}> 

<CallModal/>
<MessageModal/>

</Box>





              <Typography variant="h6" fontWeight="bold" mb={1}>
                {lead ?  `${lead.firstName } ${lead.lastName}` : 'none'}
              </Typography>
              <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mb={1}>
                {lead ? lead.phone : 'none'}
              </Typography>
              <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mb={2}>
                {lead ? lead.email : 'none'}
              </Typography>

              <Divider />

              <Box mt={2} sx={{}}> 
                <Typography variant="h6" fontWeight="bold" mb={1}>
                
                   {arrayCell != null ? arrayCell : (null) }
                </Typography>



                 <CategoryBoxView  Lead={lead} successCheck={handleClick} />
                <TagBoxView Lead={lead} successCheck={handleClick}  />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
<Box sx={{ flexGrow: 1 }}>
<Typography variant="h4" fontWeight="bold" color="primary">
Lead
</Typography>
<Divider />
<Box mt={2} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
           <Box sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'left', width: '25%', height: '10vh'}}>  
           <Typography variant="h6" fontWeight="bold">
                Tags
              </Typography>
              <Typography variant="body1" mt={1} sx={{fontWeight: 'bold', color: 'green'}}>
  {lead ? (
    <>
      {lead.tags.map(tag => (
        <p key={tag.id}>{tag.title}</p>
      ))}
    </>
  ) : (
    'none'
  )}
</Typography>

           </Box>
           
           <Box sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'left', width: '25%', height: '10vh'}}>  
           <Typography variant="h6" fontWeight="bold" mb={1}>
              Categories
            </Typography>
            <Typography variant="body1" mt={1} sx={{fontWeight: 'bold', color: 'green'}}>
  {lead ? (
    <>
      {lead.categories.map(tag => (
        <p key={tag.id}>{tag.title}</p>
      ))}
    </>
  ) : (
    'none'
  )}
</Typography>
          </Box>
          

     
         
            </Box>
          </Box>

        
        </Box>

        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Notes
                </Typography>
                {notesLoading ? (
                  <Typography variant="body1">Loading Notes...</Typography>
                ) : notesData && notesData.notes && notesData.notes.length > 0 ? (
                  notesData.notes.map((note) => <SnackBar notes={notesData} type="Notes" />)
                ) : (
                  <Typography variant="body1">No Notes</Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Calls
                </Typography>
                {callsLoading ? (
                  <Typography variant="body1">Loading Calls...</Typography>
                ) : callsData ? (
                  <SnackBar calls={callsData} type="Calls" />
                ) : (
                  <Typography variant="body1">No Calls</Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  E-Alerts
                </Typography>
                {ealertsLoading ? (
                  <Typography variant="body1">Loading E-Alerts...</Typography>
                ) : ealertsData ? (
                  <SnackBar alerts={ealertsData} type="E-Alerts" />
                ) : (
                  <Typography variant="body1">No E-Alerts</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>


    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Updated Lead!
        </Alert>
      </Snackbar>
  </Container>
</>
);
}




