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


  const [users, setUsers] = useState([]);

  const [lead, setLead] = useState();

  const [selectedLead, setSelectedLead] = useState(null);

  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);

  const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);

  const [addCall, { Callloading, Callerror, Calldata }] = useMutation(ADD_CALL);



  useEffect(() => {
    
    if (leadsData) {
      // alert("Lead Data");
      console.log(leadsData);
      const { leads } = leadsData;
      setUsers(leads);
      setLead(leads[0]);
      setSelectedLead(leads[0]);
      // alert("Set leads Data");

  

    } else {
      setUsers([]);
    }
  
  
    return () => {
      
    }
  }, [leadsData])
  

  const handleUpload = async () => {
    console.log("Uploading calls...");
    setLoading(true);
  
    try {
      await Promise.all(
        data.map(async (call) => {

   

          const matchingLead = users.find(
            (lead) =>
              lead.firstName === call.FirstName && lead.lastName === call.LastName
          );
  
          if (matchingLead) {
            console.log(
              `Call with firstName "${call.FirstName}" and lastName "${call.LastName}" matches lead with leadd first name: $"${matchingLead.firstName} and last name ${matchingLead.lastName}"`
            );
  
            await addCall({
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
            });
  
            console.log(`Call with firstName "${call.FirstName}" and lastName "${call.LastName}" uploaded successfully`);
            setCallSaved(true);
          }else{ 
            console.log(
              `Call diid not match firstName "${call.FirstName}" and lastName "${call.LastName}" matches lead with leadd first name: $"${matchingLead.firstName} and last name ${matchingLead.lastName}"`
            );
          }
        })
      );
  
   
      // console.log("All calls uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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


