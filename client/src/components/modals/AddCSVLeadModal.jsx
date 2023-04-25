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
import styles from './AddCSVLeadsModal.module.css';
import { ADD_LEAD } from '../../mutations/leadMutations';


export default function AddCSVLeadModal() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    phone: "",
    phoneStatus: "",
    descritpion: "",
    emailInvalid: "",
    GloballyOptedOutOfEmail: "",
    GloballyOptedOutOfBuyerAgentEmail: "",
    GloballyOptedOutOfListingAgentEmail: "",
    GloballyOptedOutOfLenderEmail: "",
    GloballyOptedOutOfAlerts: '',
    OptInDate: "",
    BuyerAgentCategory: "",
    ListingAgentCategory: "",
    LenderCategory: "",
    BuyerAgent: "",
    ListingAgent: "",
    Lender: "",
    OriginalSource: "",
    OriginalCampaign: "",
    LastAgentNote: "",
    eAlerts: "",
    VisitTotal: "",
    listingviewcount: "",
    AvgListingPrice: "",
    NextCallDue: "",
    LastAgentCallDate: "",
    LastLenderCallDate: "",
    FirstVisitDate: "",
    LastVisitDate: "",
    RegisterDate: "",
    LeadType: "",
    AgentSelected: "",
    LenderOptIn: "",
    Address: "",
    City: "",
    State: "",
    ZipCode: "",
    Tags: [],
    Link: "",
    Birthday: "",
    HomeClosingDate: "",

  });


  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });
  };




// 

  const handleLeadSubmit = (e) => {
    e.preventDefault();

    //    Loop through the data and submit each lead
    //     using the Apollo Client

    addLead({
      variables: formData,
    }).then((res) => {
      setFormData({
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
      addLead({
        variables: {
          firstName: lead.FirstName,
          email: lead.Emails,
          lastName: lead.LastName,
          description: lead.Description,
          phone: lead.Phones,
          phoneStatus: lead.PhoneStatus,
          emailInvalid: lead.EmailInvalid,
          GloballyOptedOutOfEmail: lead.GloballyOptedOutOfEmail,
          GloballyOptedOutOfBuyerAgentEmail: lead.GloballyOptedOutOfBuyerAgentEmail,
          GloballyOptedOutOfListingAgentEmail: lead.GloballyOptedOutOfListingAgentEmail,
          GloballyOptedOutOfLenderEmail: lead.GloballyOptedOutOfLenderEmail,
          GloballyOptedOutOfAlerts: lead.GloballyOptedOutOfAlerts,
          OptInDate: lead.OptInDate,
          BuyerAgentCategory: lead.BuyerAgentCategory,
          ListingAgentCategory: lead.ListingAgentCategory,
          LenderCategory: lead.LenderCategory,
          BuyerAgent: lead.BuyerAgent,
          ListingAgent: lead.ListingAgent,
          Lender: lead.Lender,
          OriginalSource: lead.OriginalSource,
          OriginalCampaign: lead.OriginalCampaign,
          LastAgentNote: lead.LastAgentNote,
          eAlerts: lead.eAlerts,
          VisitTotal: lead.VisitTotal,
          listingviewcount: lead.listingviewcount,
          AvgListingPrice: lead.AvgListingPrice,
          NextCallDue: lead.NextCallDue,
          LastAgentCallDate: lead.LastAgentCallDate,
          LastLenderCallDate: lead.LastLenderCallDate,
          FirstVisitDate: lead.FirstVisitDate,
          LastVisitdDate: lead.LastVisitDate,
          RegisterDate: lead.RegisterDate,
          LeadType: lead.LeadType,
          AgentSelected: lead.AgentSelected,
          LenderOptIn: lead.LenderOptIn,
          Address: lead.Address,
          City: lead.City,
          State: lead.State,
          ZipCode: lead.ZipCode,
          Tags: lead.Tags,
          Link: lead.Link,
          Birthday: lead.Birthday,
          HomeClosingDate: lead.HomeClosingDate
        }
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });




    });
  
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
    setData(false);
  };

  return (
    <div  >
      <Button variant="outlined" onClick={handleClickOpen}>
       Add Lead CSV
      </Button>


      <Dialog  open={open} onClose={handleClose}  >
        <DialogTitle >New CSV Lead File</DialogTitle >
        <DialogContent className={styles.AddCSVLeadsModal}>


          <DialogContentText>
            Upload your lead CSV file here!
          </DialogContentText>





{data ? ( <DataGridCSV UserData={data} />) : ( <p>Upload a CSV file</p>)}
            
       
         {/* <DataGridCSV data={data} />        */}
        

          <Button variant="outlined" onClick={handleClickOpen}>
          <CsvUpload handleData={handleChildData} />
                </Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"red"}}>Cancel</Button>
          <Button onClick={handleUpload}>Upload Leads</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


