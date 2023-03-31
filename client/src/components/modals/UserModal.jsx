import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

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
import styles from './UserPage.module.css';
import { ADD_LEAD } from '../../mutations/leadMutations';
import {ADD_EALERT} from '../../mutations/eAlertMutations';
import {ADD_NOTE} from '../../mutations/noteMutations';
import ProfileP from '../Profile/ProfileP';

export default function UserModal({RowId}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    contactId: '',
    firstName: '',
    lastName: '',
    notes: '',
    buyerAgent: '',
    listingAgent: '',
    leadId: '',
  });


  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);



  const [addNote, { eAlertloading, eAlerterror, eAlertddata }] = useMutation(ADD_NOTE);

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




  const handleUpload = () => {
    setLoading(true);

    data.forEach((lead) => {
        console.log(lead);

        try{
            addNote({
                variables: {
                    contactId: '63f1ad157a94bcff4184d31c',
                    FirstName: '63f1ad157a94bcff4184d31c',
                    LastName:'63f1ad157a94bcff4184d31c',
                    Notes: '63f1ad157a94bcff4184d31c',
                    BuyerAgent: '63f1ad157a94bcff4184d31c',
                    ListingAgent:'63f1ad157a94bcff4184d31c',
                    leadId:'63f1ad64d855342f3c84d873'
                    
                },
    
                    
                    
           });
        } catch (error) {
            console.log(error);
        }

   
    });
  
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
  
    setLoading(false);
  };




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
    <div className={styles.MainDiv}  >
      <Button variant="outlined" onClick={handleClickOpen}>
       Profile 
      </Button>

<div className={styles.ModalMain}>
       <Dialog maxWidth="xl" maxHeight="xl"   sx={{width: '100%',  height: '100%',
    display: 'flex',
    flexDirection: 'column',
   
    }} open={open} onClose={handleClose}  >
      
    
        <DialogTitle >Profile </DialogTitle >
        <DialogContent  className={styles.MainModal}>

              <Box sx={{width: '100%' , height: 'fit-content'}}> 
                <ProfileP rowId={RowId}/>
    
  </Box>
        </DialogContent>

  

        <DialogActions>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    


</div>
   
    </div>
  );
}


