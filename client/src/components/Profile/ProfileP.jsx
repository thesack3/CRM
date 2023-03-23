
import * as React from 'react';
import { useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import { Grid, Container, Typography, Button, Select, MenuItem, Divider, Avatar  } from '@mui/material';
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
import SnackBar from '../dataGrid/SnackBar';


import EmailActionModal from '../modals/EmalActionModal';



export default function ProfileP({ rowId }) {
  const [users, setUsers] = useState([]);
  const [lead, setLead] = useState();
  const [selectedLead, setSelectedLead] = useState(null);
  
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
  
  useEffect(() => {
    if (leadsData) {
      const { leads } = leadsData;
      setUsers(leads); 
      setLead(leads[rowId]);
      setSelectedLead(leads[rowId]);


      // console.log("leadsData");
      // console.log(lead);

    } else {
      setUsers([]);
    }
  }, [selectedLead]);
  
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

              <Typography variant="h6" fontWeight="bold" mb={1}>
                {lead ?  `${lead.firstName } ${lead.lastName}` : 'none'}
              </Typography>
              <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mb={1}>
                {lead ? lead.phone : 'none'}
              </Typography>
              <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mb={2}>
                {lead ? lead.id : 'none'}
              </Typography>

              <Divider />

              <Box mt={2} sx={{}}> 
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Tags 
                   {lead ? lead.tags.length : 'none'}
                </Typography>




                <TagBoxView Lead={lead}  />
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
                Description
              </Typography>
              <Typography variant="body1" mt={1}>
                {lead ? lead.description : 'none'}
              </Typography>
           </Box>
           
           <Box sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'left', width: '25%', height: '10vh'}}>  
           <Typography variant="h6" fontWeight="bold" mb={1}>
              Category/Time
            </Typography>
            <Typography variant="body1" mb={2}>
              10-02-2023 10:00 AM
            </Typography>
          </Box>
          

          <Box sx={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'left' , width: '25%', height: '10vh'}}>  
          <Typography variant="h6" fontWeight="bold" mb={1}>
              Status
            </Typography>
            <Typography variant="body1" mb={2}>
              {lead ? lead.status : 'none'}
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
  </Container>
</>
);
}












// export default function ProfileP({ rowId }) {
//   const [users, setUsers] = useState([]);
//   const [lead, setLead] = useState();
//   const [selectedLead, setSelectedLead] = useState(null);
  
//   const theme = useTheme();
  
//   const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);
//   const { loading: callsLoading, error: callsError, data: callsData } = useQuery(GET_CALLS, {
//   variables: { leadId: selectedLead ? selectedLead.id : null },
//   skip: !selectedLead,
//   });
//   const { loading: ealertsLoading, error: ealertsError, data: ealertsData } = useQuery(GET_EALERTS, {
//   variables: { leadId: selectedLead ? selectedLead.id : null },
//   skip: !selectedLead,
//   });
//   const { loading: notesLoading, error: notesError, data: notesData } = useQuery(GET_NOTES, {
//   variables: { leadId: selectedLead ? selectedLead.id : null },
//   skip: !selectedLead,
//   });
  
//   const handleLeadChange = (lead) => {
//   setSelectedLead(lead);
//   };
  
//   useEffect(() => {
//   if (leadsData) {
//   const { leads } = leadsData;
//   setUsers(leads); 
//   setLead(leads[rowId]);
//   setSelectedLead(leads[rowId]);
//   } else {
//   setUsers([]);
//   }
//   }, [selectedLead]);
  
//   return (
//   <>
//   <Helmet>
//   <title>RE CRM</title>
//   </Helmet>
//   <Container maxWidth="100%" sx={{ paddingBottom: '10em' }}>
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       
//           <Box sx={{ flexGrow: 1, mr: 1  }}>
           
//             <Typography variant="h4" fontWeight="bold" color="primary">
//               Lead
//             </Typography>
//             <Divider />


//           {/* Profile image */}
//             <Box> 
//   <image src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" alt=""/>
          
//             </Box>
          
//             <Typography variant="h6" fontWeight="bold">
//               {lead ? lead.firstName : 'none'}
//             </Typography>
//             <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mt={1}>
//               {lead ? lead.phone : 'none'}
//             </Typography>
//             <Typography variant="body1" fontWeight="bold" wordWrap="break-word" mt={1}>
//               {lead ? lead.id : 'none'}
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//             <Box sx={{ ml: 0 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 Tags
//               </Typography>
//               <Divider />
//               <Typography variant="body1" mt={2}>
//                 10-02-2023 10:00 AM
//               </Typography>
//             </Box>
//             <Box sx={{ ml: 0 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 Category/Time
//                 </Typography>
//               <Divider />
//               <Typography variant="body1" mt={2}>
//                 10-02-2023 10:00 AM
//               </Typography>
//             </Box>
//             <Box sx={{ ml: 0 }}>
//               <Typography variant="h6" fontWeight="bold">
//                 Description
//               </Typography>
//               <Divider />
//               <Typography variant="body1" mt={2}>
//                 {lead ? lead.description : 'none'}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Grid>
//       <Grid item xs={12}>
//     <TagBoxView tags={['64175ee99bd62148d3e36407']} setLead={handleLeadChange} />
//   </Grid>

//   <Grid item xs={12} md={4} lg={4}>
//     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         Notes
//       </Typography>
//       {notesLoading ? (
//         <Typography variant="body1">Loading Notes...</Typography>
//       ) : notesData && notesData.notes && notesData.notes.length > 0 ? (
//         notesData.notes.map((note) => <SnackBar notes={notesData} type="Notes" />)
//       ) : (
//         <Typography variant="body1">No Notes</Typography>
//       )}
//     </Box>
//   </Grid>

//   <Grid item xs={12} md={4} lg={4}>
//     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         Calls
//       </Typography>
//       {callsLoading ? (
//         <Typography variant="body1">Loading Calls...</Typography>
//       ) : callsData ? (
//         <SnackBar calls={callsData} type="Calls" />
//       ) : (
//         <Typography variant="body1">No Calls</Typography>
//       )}
//     </Box>
//   </Grid>

//   <Grid item xs={12} md={4} lg={4}>
//     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         E-Alerts
//       </Typography>
//       {ealertsLoading ? (
//         <Typography variant="body1">Loading E-Alerts...</Typography>
//       ) : ealertsData ? (
//         <SnackBar alerts={ealertsData} type="E-Alerts" />
//       ) : (
//         <Typography variant="body1">No E-Alerts</Typography>
//       )}
//     </Box>
//   </Grid>


// </Grid>

// </Container>
// </>
// );
// }
  


















// export default function ProfileP({rowId}) {

//   const [users, setUsers] = useState([]);

//   const theme = useTheme();

//   const [lead, setLead] = useState();
//   const [selectedLead, setSelectedLead] = useState(null);

//   const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);
//   // const { loading: notesLoading, error: notesError, data: notesData } = useQuery(GET_NOTES);


//   const { loading: callsLoading, error: callsError, data: callsData } = useQuery(GET_CALLS, {
//     variables: { leadId: selectedLead ? selectedLead.id : null },
//     skip: !selectedLead,
//   });

//   const { loading: ealertsLoading, error: ealertsError, data: ealertsdata } = useQuery(GET_EALERTS, {
//     variables: { leadId: selectedLead ? selectedLead.id : null },
//     skip: !selectedLead,
//   });

//   const { loading: notesLoading, error: notesError, data: notesData } = useQuery(GET_NOTES, {
//     variables: { leadId: selectedLead ? selectedLead.id : null },
//     skip: !selectedLead,
//   });

//   const handleLeadChange = (lead) => {
//     setSelectedLead(lead);
//   };
  

//   useEffect(() => {
//     if (leadsData) {
//       // alert("Lead Data");
//       console.log(leadsData);
//       const { leads } = leadsData;
//       setUsers(leads);
//       setLead(leads[rowId]);
//       setSelectedLead(leads[rowId]);


//       if(notesData){
//         // alert("Notes Data");
//         console.log(notesData);
//       }
//       if (callsData) {
//         // alert("Calls Data");
//         console.log(callsData);
//       }
//       if (ealertsdata) {
//         // alert("EAlerts Data");
//         console.log(ealertsdata);
//       }








//     } else {
//       setUsers([]);
//     }
//   }, [selectedLead]);




//   return (
//     <>
//       <Helmet>
//         <title> RE CRM </title>
//       </Helmet>

//       <Container maxWidth="xl" >
  

//         <Grid container spacing={3} sx={{height: 'fit-content', paddingBottom: '10em'}} >





// <Grid item xs={12} sx={{ height: 'fit-content' , display: 'flex',justifyContent: 'center', alignContent: 'center'}}>
//   <Box  sx={{width: '100%' , display: 'flex', flexDirection: 'row'}}> 
  

//   {/* LEAD INFO  */}

//   <Box sx={{width: '150px' }}>
//   <p style={{fontWeight: 'bold'}}>
//     Lead
//   </p>
//   <hr color='black'/>
//   <p style={{fontWeight: 'bold'}}>
//     {lead ? lead.firstName : 'none'}
//   </p>
//   <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
 
//   {lead ? lead.phone : 'none'}
//   </p>
//   <p style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
//   {lead ? lead.id : 'none'}
//   </p>
// </Box>


// <Box sx={{width: '120px',  marginLeft: '5px'}}>
//   <p style={{fontWeight: 'bold'}}>
//     Tags
//   </p>
//   <hr color='black'/>
//   <p>10-02-2023 10:00 AM
//   </p>
// </Box>


// <Box sx={{width: '120px',  marginLeft: '5px'}}>
//   <p style={{fontWeight: 'bold'}}>
//     Category/ Time
//   </p>
//   <hr color='black'/>
//   <p>10-02-2023 10:00 AM
//   </p>
// </Box>

// <Box sx={{width: '450px', marginLeft: '5px'}}>
//   <p style={{fontWeight: 'bold'}}>
//     Description
//   </p>

//   <hr color='black'/>
//   {lead ? lead.description : 'none'}
// </Box>


  


//   </Box>



// </Grid>


  



// <Grid item xs={12} sx={{ height: 100 , display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
//           <TagBoxView tags={["64175ee99bd62148d3e36407"]} setLead={handleLeadChange} />

//           </Grid>


// <Grid item xs={4} md={4} lg={4} sx={{display: 'flex-direction', justifyContent: 'center'}}>




// <h3>
//       Note
//   </h3>
//   {/* {selectedLead ? selectedLead.id : null} */}

//   {notesLoading ? "Loading Notes..." : (notesData && notesData.notes && notesData.notes.length > 0 ? (
//   notesData.notes.map((note) => (
//     <SnackBar notes={notesData} type={"Notes"}/>
  
//   ))
// ) : "No Notes")}





// </Grid>


// <Grid item xs={4} md={4} lg={4} sx={{display: 'flex-direction', justifyContent: 'center'}}>

//     <h3>
//                 Calls
//             </h3>

//       {callsLoading ? "Loading Notes..." : (callsData  ? (
  
//         <SnackBar calls={callsData} type={"Notes"}/>

   
//     ) : "No Notes")}





// </Grid>





// <Grid item xs={4} md={4} lg={4} sx={{display: 'flex-direction', justifyContent: 'center'}}>

// <h3>
//                 E-Alerts
//               </h3>
//               {ealertsLoading ? "Loading Ealerts..." : (ealertsdata  ? (
  
//              <SnackBar alerts={ealertsdata} type={"Notes"}/>


// ) : "No E-lerts")}





// </Grid>







       
//         </Grid>
//       </Container>
//     </>
//   );
// }












