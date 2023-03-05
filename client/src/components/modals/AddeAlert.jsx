import * as React from 'react';
import { useState , useEffect} from 'react';
import { useMutation , useQuery} from '@apollo/client';
import { BsCheck } from 'react-icons/bs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';
import DataGridCSV from '../dataGrid/DataGridCSV';
import styles from './AddCSVLeadsModal.module.css';
import { ADD_LEAD } from '../../mutations/leadMutations';
import {ADD_EALERT} from '../../mutations/eAlertMutations';
import { GET_LEADS } from '../../queries/leadQueries';


export default function AddeAlert() {




  const [ alertSaved, setAlertSaved ] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);


  const [users, setUsers] = useState([]);

  const [lead, setLead] = useState();

  const [selectedLead, setSelectedLead] = useState(null);

  const [formData, setFormData] = useState({
    contactId: '',
    FirstName: '',
    LastName: '',
    SearchName: '',
    QueryString: '',
    EmailFrequency: '',
    BuyerAgent: '',
    ListingAgent: '',
    leadId: '',
  });


  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);


  const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);

  const [addeAlert, { eAlertloading, eAlerterror, eAlertddata }] = useMutation(ADD_EALERT);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });
  };

useEffect(() => {

  if (leadsData) {
    // alert("Lead Data");
    console.log(leadsData);
    const { leads } = leadsData;
    setUsers(leads);
    setLead(leads[0]);
    setSelectedLead(leads[0]);


    // if(notesData){
    //   // alert("Notes Data");
    //   console.log(notesData);
    // }
    // if (callsData) {
    //   // alert("Calls Data");
    //   console.log(callsData);
    // }
    // if (ealertsdata) {
    //   // alert("EAlerts Data");
    //   console.log(ealertsdata);
    // }





  } else {
    setUsers([]);
  }

  
  

  return () => {
    
  }
}, [])

const handleUpload = async () => {
  setLoading(true);
  console.log("Uploading e-alerts...");

  try {
    await Promise.all(
      data.map(async (eAlert) => {
        // Search for the lead whose firstName and lastName match with the eAlert's firstName and lastName
        const matchingLead = users.find((lead) => lead.firstName === eAlert.FirstName && lead.lastName === eAlert.LastName);
        
        if (matchingLead) {
          // If a matching lead is found, log its leadId
          console.log(`eAlert with firstName "${eAlert.FirstName}" and lastName "${eAlert.LastName}" matches lead with leadId "${matchingLead.id}"`);
          // Upload the eAlert with the matching leadId
          await addeAlert({
            variables: {
              contactId: matchingLead.id,
              FirstName: eAlert.FirstName,
              LastName: eAlert.LastName,
              SearchName: eAlert.SearchName,
              QueryString: eAlert.QueryString,
              EmailFrequency: eAlert.EmailFrequency,
              BuyerAgent: eAlert.BuyerAgent,
              ListingAgent: eAlert.ListingAgent,
              leadId: matchingLead.id,
            },
          });
          console.log(`eAlert with firstName "${eAlert.FirstName}" and lastName "${eAlert.LastName}" uploaded successfully`);
          setAlertSaved(true);
        } else {
          // If no matching lead is found, log an error
          // console.error(`eAlert with firstName "${eAlert.FirstName}" and lastName "${eAlert.LastName}" does not match any lead`);
        }
      })
    );
    console.log("All e-alerts uploaded successfully");
    setAlertSaved(true);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};







  const handleLeadSubmit = (e) => {
    e.preventDefault();

    //    Loop through the data and submit each lead
    //     using the Apollo Client

    addLead({
      variables: formData,
    }).then((res) => {
      setFormData({
        contactID: '',
        firstName: '',
        email: '',
        lastName: '',
        description: '',
        phone: '',
        
        //      ...rest of the form fields
      });
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });


    console.log("Lead Submitted!");
  }



// WORKING: 
  // const handleUpload = () => {
  //   setLoading(true);

  //   data.forEach((eAlert) => {

  //     console.log("Uploading e-alerts...");



  //     // Search for the lead whose firstName and lastName match with the eAlert's firstName and lastName
  //     const matchingLead = users.find((lead) => lead.firstName === eAlert.FirstName && lead.lastName === eAlert.LastName);
    

  //     if (matchingLead) {
  //       // If a matching lead is found, log its leadId
  //       console.log(`eAlert with firstName "${eAlert.FirstName}" and lastName "${eAlert.LastName}" matches lead with leadId "${matchingLead.id}"`);
  //       // Upload the eAlert with the matching leadId



  //       // SET 
  //       addeAlert({
  //         variables: {
  //           contactId: matchingLead.id,
  //           FirstName: eAlert.FirstName,
  //           LastName: eAlert.LastName,
  //           SearchName: eAlert.SearchName,
  //           QueryString: eAlert.QueryString,
  //           EmailFrequency: eAlert.EmailFrequency,
  //           BuyerAgent: eAlert.BuyerAgent,
  //           ListingAgent: eAlert.ListingAgent,
  //           leadId: matchingLead.id,
  //         },
  //       }).then((res) => {
  //         setAlertSaved(true);
  //       })


  //     } else {
  //       // If no matching lead is found, log an error
  //       // console.error(`eAlert with firstName "${eAlert.FirstName}" and lastName "${eAlert.LastName}" does not match any lead`);
  //     }
  //   });
  //   setLoading(false);
  // };
  

//   const handleUpload = () => {
//     setLoading(true);

//     data.forEach((lead) => {
//         console.log(lead);
//         addeAlert({
//             variables: {
//                 contactId: "lead.ContactID",
//                 FirstName: "lead.FirstName",
//                 LastName: "lead.LastName",
//                 SearchName: "lead.SearchName",
//                 QueryString: "lead.QueryString",
//                 EmailFrequency:" lead.EmailFrequency",
//                 BuyerAgent: "lead.BuyerAgent",
//                 ListingAgent: "lead.ListingAgent",
//                 leadId: '63f1ad64d855342f3c84d873',
//                 // leadId: lead.LeadId,
                
//             },

                
                
//        });
//     });
  
// //     data.forEach((lead) => {

// // console.log(lead);
// //       addLead({
// //         variables: {
// //           firstName: lead.FirstName,
// //           email: lead.Emails,
// //           lastName: lead.LastName,
// //           description: lead.Description,
// //           phone: lead.Phones,
// //           phoneStatus: lead.PhoneStatus,
// //           emailInvalid: lead.EmailInvalid,
// //           GloballyOptedOutOfEmail: lead.GloballyOptedOutOfEmail,
// //           GloballyOptedOutOfBuyerAgentEmail: lead.GloballyOptedOutOfBuyerAgentEmail,
// //           GloballyOptedOutOfListingAgentEmail: lead.GloballyOptedOutOfListingAgentEmail,
// //           GloballyOptedOutOfLenderEmail: lead.GloballyOptedOutOfLenderEmail,
// //           GloballyOptedOutOfAlerts: lead.GloballyOptedOutOfAlerts,
// //           OptInDate: lead.OptInDate,
// //           BuyerAgentCategory: lead.BuyerAgentCategory,
// //           ListingAgentCategory: lead.ListingAgentCategory,
// //           LenderCategory: lead.LenderCategory,
// //           BuyerAgent: lead.BuyerAgent,
// //           ListingAgent: lead.ListingAgent,
// //           Lender: lead.Lender,
// //           OriginalSource: lead.OriginalSource,
// //           OriginalCampaign: lead.OriginalCampaign,
// //           LastAgentNote: lead.LastAgentNote,
// //           eAlerts: lead.eAlerts,
// //           VisitTotal: lead.VisitTotal,
// //           listingviewcount: lead.listingviewcount,
// //           AvgListingPrice: lead.AvgListingPrice,
// //           NextCallDue: lead.NextCallDue,
// //           LastAgentCallDate: lead.LastAgentCallDate,
// //           LastLenderCallDate: lead.LastLenderCallDate,
// //           FirstVisitDate: lead.FirstVisitDate,
// //           LastVisitdDate: lead.LastVisitDate,
// //           RegisterDate: lead.RegisterDate,
// //           LeadType: lead.LeadType,
// //           AgentSelected: lead.AgentSelected,
// //           LenderOptIn: lead.LenderOptIn,
// //           Address: lead.Address,
// //           City: lead.City,
// //           State: lead.State,
// //           ZipCode: lead.ZipCode,
// //           Tags: lead.Tags,
// //           Link: lead.Link,
// //           Birthday: lead.Birthday,
// //           HomeClosingDate: lead.HomeClosingDate
// //         }
// //       }).then((res) => {
// //         console.log(res);
// //       }).catch((err) => {
// //         console.log(err);
// //       });




// //     });
  
//     setLoading(false);
//   };




  const handleChildData = (data) => {


    setData(data);
    
  //  console.log('Bulk Action data from child');

 //  console.log(data);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div  style={{margin: '10px'}} >
      <Button variant="outlined" onClick={handleClickOpen}>
       Add eAlerts
      </Button>


      <Dialog  open={open} onClose={handleClose}  >
        <DialogTitle >New eAlerts File</DialogTitle >
        <DialogContent className={styles.AddCSVLeadsModal}>


      {alertSaved ? (<>

 <Box sx={{display: 'flex', justifyContent: 'center' , flexDirection: 'column', alignItems: 'center'}}>

<p>Ealerts Saved and autoassociated!</p>
          <BsCheck/>
          </Box>

      
      </>): <>
      
      <DialogContentText>
            Upload your ealert CSV file here!
          </DialogContentText>




          


          {data ? ( <DataGridCSV UserData={data} />) : ( <p>Upload a CSV file</p>)}
            </>}



     


         {/* <DataGridCSV data={data} />        */}
        

{alertSaved ? (null) : (   <Button variant="outlined" onClick={handleClickOpen}>
          <CsvUpload handleData={handleChildData} />
                </Button>
)}

       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"red"}}>Cancel</Button>
          <Button onClick={handleUpload}>Upload Leads</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


