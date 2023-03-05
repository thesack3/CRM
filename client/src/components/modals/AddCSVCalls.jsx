import * as React from 'react';
import { useState , useEffect} from 'react';
import { useMutation, useQuery } from '@apollo/client';
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
import { GET_LEADS } from '../../queries/leadQueries';

import {ADD_CALL} from '../../mutations/addCall';


export default function AddCSVCall() {


  const [ callSaved, setCallSaved ] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    lastName: '',
    description: '',
    phone: '',
    phoneStatus: '',
    emailInvalid: '',
    GloballyOptedOutOfEmail: '',
    GloballyOptedOutOfBuyerAgentEmail: '',
    GloballyOptedOutOfListingAgentEmail: '',
    GloballyOptedOutOfLenderEmail: '',
    GloballyOptedOutOfAlerts: '',
    OptInDate: '',
    BuyerAgentCategory: '',
    ListingAgentCategory: '',
    LenderCategory: '',
    BuyerAgent: '',
    ListingAgent: '',
    Lender: '',
    OriginalSource: '',
    OriginalCampaign: '',
    LastAgentNote: '',
    eAlerts: '',
    VisitTotal: '',
    listingviewcount: '',
    AvgListingPrice: '',
    NextCallDue: '',
    LastAgentCallDate: '',
    LastLenderCallDate: '',
    FirstVisitDate: '',
    LastVisitDate: '',
    RegisterDate: '',
    LeadType: '',
    AgentSelected: '',
    LenderOptIn: '',
    Address: '',
    City: '',
    State: '',
    ZipCode: '',
    Tags: '',
    Link: '',
    Birthday: '',
    HomeClosingDate: ''
  });

  const [users, setUsers] = useState([]);

  const [lead, setLead] = useState();

  const [selectedLead, setSelectedLead] = useState(null);

  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);

  const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);

  const [addCall, { Callloading, Callerror, Calldata }] = useMutation(ADD_CALL);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });
  };






  const handleLeadSubmit = (e) => {
    e.preventDefault();

    //    Loop through the data and submit each lead
    //     using the Apollo Client

    // addLead({
    //   variables: formData,
    // }).then((res) => {
    //   setFormData({
    //     firstName: '',
    //     email: '',
    //     lastName: '',
    //     description: '',
    //     phone: '',
        
    //     //      ...rest of the form fields
    //   });
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });


    console.log("Lead Submitted!");
  }


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
  
  const handleUpload = () => {




    console.log("Uploading calls...");
    setLoading(true);
  
    try{

      data.forEach((call) => {
        // console.log(call);
        const matchingLead = users.find((lead) => lead.firstName === call.FirstName && lead.lastName === call.LastName);
    
        if (matchingLead) {
          console.log(`Call with firstName "${call.FirstName}" and lastName "${call.LastName}" matches lead with leadId "${matchingLead.id}"`);
    
       //   Upload the call with the matching leadId
  
  
  
       
       // SET
  
  
       console.log(call);
          addCall({
            variables: {
              contactId: matchingLead.id,
              FirstName: call.FirstName,
              LastName: call.LastName,
              DateCreated: call.DateCreated,
              BuyerAgent: call.BuyerAgent,
              ListingAgent: call.ListingAgent,
              UserID: call.UserID,
              AssociatedopportunityID: call.AssociatedOpportunityID,
              CallDetails: call.CallDetails,
              ContactPhoneID: call.ContactPhoneID,
              LogType: call.LogType,
              MediaURL: "null",
              CallStartTime: "null",
              CallEndTime: "null",
         
              leadId: matchingLead.id,
            },
          }).then((res) => {
            setCallSaved(true);
          })
  
  
        } 
      });
    }catch(err){

      console.log(err);
    }
  
    setLoading(false);
  };
  


//   const handleUpload = () => {
//     setLoading(true);
  
//     data.forEach((lead) => {

// console.log(lead);
//       addLead({
//         variables: {
//           firstName: lead.FirstName,
//           email: lead.Emails,
//           lastName: lead.LastName,
//           description: lead.Description,
//           phone: lead.Phones,
//           phoneStatus: lead.PhoneStatus,
//           emailInvalid: lead.EmailInvalid,
//           GloballyOptedOutOfEmail: lead.GloballyOptedOutOfEmail,
//           GloballyOptedOutOfBuyerAgentEmail: lead.GloballyOptedOutOfBuyerAgentEmail,
//           GloballyOptedOutOfListingAgentEmail: lead.GloballyOptedOutOfListingAgentEmail,
//           GloballyOptedOutOfLenderEmail: lead.GloballyOptedOutOfLenderEmail,
//           GloballyOptedOutOfAlerts: lead.GloballyOptedOutOfAlerts,
//           OptInDate: lead.OptInDate,
//           BuyerAgentCategory: lead.BuyerAgentCategory,
//           ListingAgentCategory: lead.ListingAgentCategory,
//           LenderCategory: lead.LenderCategory,
//           BuyerAgent: lead.BuyerAgent,
//           ListingAgent: lead.ListingAgent,
//           Lender: lead.Lender,
//           OriginalSource: lead.OriginalSource,
//           OriginalCampaign: lead.OriginalCampaign,
//           LastAgentNote: lead.LastAgentNote,
//           eAlerts: lead.eAlerts,
//           VisitTotal: lead.VisitTotal,
//           listingviewcount: lead.listingviewcount,
//           AvgListingPrice: lead.AvgListingPrice,
//           NextCallDue: lead.NextCallDue,
//           LastAgentCallDate: lead.LastAgentCallDate,
//           LastLenderCallDate: lead.LastLenderCallDate,
//           FirstVisitDate: lead.FirstVisitDate,
//           LastVisitdDate: lead.LastVisitDate,
//           RegisterDate: lead.RegisterDate,
//           LeadType: lead.LeadType,
//           AgentSelected: lead.AgentSelected,
//           LenderOptIn: lead.LenderOptIn,
//           Address: lead.Address,
//           City: lead.City,
//           State: lead.State,
//           ZipCode: lead.ZipCode,
//           Tags: lead.Tags,
//           Link: lead.Link,
//           Birthday: lead.Birthday,
//           HomeClosingDate: lead.HomeClosingDate
//         }
//       }).then((res) => {
//         console.log(res);
//       }).catch((err) => {
//         console.log(err);
//       });




//     });
  
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
    <div   style={{margin: '10px'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
       Add Calls
      </Button>






      <Dialog  open={open} onClose={handleClose}  >
        <DialogTitle >New CSV Lead File</DialogTitle >
        <DialogContent className={styles.AddCSVLeadsModal}>


          

        {callSaved ? (<>
          <Box sx={{display: 'flex', justifyContent: 'center' , flexDirection: 'column', alignItems: 'center'}}>

<p>Calls Saved!</p>
          <BsCheck/>
          </Box>

          
          </>
          ):(<>
          
        
            <DialogContentText>
            Upload your ealert CSV file here!
          </DialogContentText>





{data ? ( <DataGridCSV UserData={data} />) : ( <p>Upload a CSV file</p>)}
            
       </>)}


         {/* <DataGridCSV data={data} />        */}
        {callSaved? (null): ( <Button variant="outlined" onClick={handleClickOpen}>
          <CsvUpload handleData={handleChildData} />
                </Button>)}

         





        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"red"}}>Cancel</Button>
          <Button onClick={handleUpload}>Upload Leads</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


