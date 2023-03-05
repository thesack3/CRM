import * as React from 'react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Button from '@mui/material/Button';

import { BsCheck } from 'react-icons/bs';
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
import {ADD_NOTE} from '../../mutations/noteMutations';
import { GET_LEADS } from '../../queries/leadQueries';




export default function AddNote() {


  const [ noteSaved, setNoteSaved ] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
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

  const [users, setUsers] = useState([]);

  const [lead, setLead] = useState();

  const [selectedLead, setSelectedLead] = useState(null);

  
  const { loading: leadsLoading, error: leadsError, data: leadsData } = useQuery(GET_LEADS);


  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);



  const [addNote, { eAlertloading, eAlerterror, eAlertddata }] = useMutation(ADD_NOTE);



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
  }, [leadsData])
  

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


  const handleUpload = async () => {
    console.log("Uploading..");
    setLoading(true);
  
    await Promise.all(
      data.map(async (note) => {



        // console.log(note);
        try {
          const matchingLead = users.find(
            (lead) =>
              lead.firstName === note.FirstName && lead.lastName === note.LastName
          );
          
          if (matchingLead) {
            console.log(
              `Note with firstName "${note.FirstName}" and lastName "${note.LastName}" matches lead with leadId "${matchingLead.id}"`
            );
  
            // await addNote({
            //   variables: {
            //     contactId: matchingLead.id,
            //     FirstName: note.FirstName,
            //     LastName: note.LastName,
            //     Notes: note.Notes,
            //     BuyerAgent: note.BuyerAgent,
            //     ListingAgent: note.ListingAgent,
            //     leadId: matchingLead.id,
            //   },
            // });
  
            console.log(`Note with firstName "${note.FirstName}" and lastName "${note.LastName}" uploaded successfully`);
          } else {
            // console.error(
            //   `Note with firstName "${note.FirstName}" and lastName "${note.LastName}" does not match lead`
            // );
          }
        } catch (error) {
          console.error(error);
        }
      })
    );
  
    setLoading(false);
    setNoteSaved(true);
  };
  

  // const handleUpload = async () => {

  //   console.log("Uploading..");
  //   setLoading(true);

  //   //   Leads
  


  //  //   For each note...
  //   data.forEach((note) => {


    
  //       try{

  //      //   Search for where a note objects firstName and lastName match a leads firstName and lastName then use the leadId to place in the note

  //      // Users is the array of leads containing the users[0].firstName and users[0].lastName and users[0].id, etc. Compare that. 
     

  //      const matchingLead = users.find((lead) => lead.firstName === note.FirstName && lead.lastName === note.LastName);
  //      if (matchingLead) {

  //        // console.log(users[0].firstName)
  //        // console.log(users[0].lastName)

  //        // console.log(note.FirstName)
  //        // console.log(note.LastName)
 
  //        // If a matching lead is found, log its leadId
  //        console.log(`Note with firstName "${note.FirstName}" and lastName "${note.LastName}" matches lead with leadId "${matchingLead.id}"`);
         
  //        // Upload the note with the matching leadId
  //        // SET



  //      await addNote({
  //          variables: {
  //            contactId: matchingLead.id,
  //            FirstName: note.FirstName,
  //            LastName: note.LastName,
  //            Notes: note.Notes,
  //            BuyerAgent: note.BuyerAgent,
  //            ListingAgent: note.ListingAgent,
  //            leadId: matchingLead.id,
  //          },
  //        }).then((res) => {
  //         setNoteSaved(true);
  //        })



  //      } else {


  //       console.log(error);
  //        // If no matching lead is found, log an error
  //         // console.error(`Note with firstName "${note.FirstName}" and lastName "${note.LastName}" does not match  lead with leadId "${matchingLead.id}"``);

  //      }





  //       } catch (error) {
  //           console.log(error);
  //       }

   
  //   });
  

  //   setLoading(false);
  // };




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
       Add Notes
      </Button>


      <Dialog  open={open} onClose={handleClose}  >
        <DialogTitle >New Note CSV File</DialogTitle >
        <DialogContent className={styles.AddCSVLeadsModal}>



          

          {noteSaved ? (<>
          <Box sx={{display: 'flex', justifyContent: 'center' , flexDirection: 'column', alignItems: 'center'}}>

<p>Notes Saved!</p>
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
        {noteSaved? (null): ( <Button variant="outlined" onClick={handleClickOpen}>
          <CsvUpload handleData={handleChildData} />
                </Button>)}

         

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"red"}}>Cancel</Button>
          <Button onClick={handleUpload}>Upload Notes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


