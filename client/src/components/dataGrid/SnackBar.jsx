import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import { BsChatText, BsJournal } from 'react-icons/bs';
import { Alert } from '@mui/material';

const action = (
  <Button color="secondary" size="small" sx={{height: '10px'}}>
     <p style={{marginRight: '5px'}}>Action</p> <BsChatText/>
  </Button>
);
const Noteaction = (
  <Button color="secondary" size="small" sx={{height: '10px'}}>
     <p style={{marginRight: '5px'}}>Note</p> <BsJournal/>
  </Button>
);
const Alertaction = (
  <Button color="secondary" size="small" sx={{height: '10px'}}>
     <p style={{marginRight: '5px'}}>Alert</p> <BsChatText/>
  </Button>
);





function CustomSnackbar({ data }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  useEffect(() => {
    if (!open) {
      handleClose();
    }
  }, [open]);

  return (
    <>
    <Button onClick={handleClick}>Show e-alert</Button>
  
    {open && (
      <Alert onClose={handleClose} severity="success">
        <p>First Name: {data.FirstName}</p>
        <p>Buyer Agent: {data.BuyerAgent}</p>
        <p>Email Frequency: {data.EmailFrequency}</p>
        <p>Last Name: {data.LastName}</p>
        <p>Listing Agent: {data.ListingAgent}</p>
        <p>Query String: {data.QueryString}</p>
        <p>Search Name: {data.SearchName}</p>
        <p>Contact ID: {data.contactId}</p>
        <p>ID: {data.Id}</p>
      </Alert>
    )}

  </>
  );
}




function CustomNoteSnackbar({ data }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      handleClose();
    }
  }, [open]);

  return (
    <>
      <Button onClick={handleClick}>Show Note</Button>

      {open && (
        <Alert onClose={handleClose} severity="info">
          <p>First Name: {data.FirstName}</p>
          <p>Buyer Agent: {data.BuyerAgent}</p>
          <p>Last Name: {data.LastName}</p>
          <p>Listing Agent: {data.ListingAgent}</p>
          <p>Notes: {data.Notes}</p>
          <p>Contact ID: {data.contactId}</p>
          <p>ID: {data.id}</p>
        </Alert>
      )}

    </>
  );
}






function CustomCallSnackbar({ data }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      handleClose();
    }
  }, [open]);

  const {
    AssociatedopportunityID,
    BuyerAgent,
    CallDetails,
    CallEndTime,
    CallStartTime,
    ContactPhoneID,
    DateCreated,
    FirstName,
    LastName,
    ListingAgent,
    LogType,
    MediaURL,
    UserID,
    contactId,
    id,
  } = data;

  return (
    <>
      <Button onClick={handleClick}>Show Call</Button>

      {open && (
        <Alert onClose={handleClose} severity="info">
          <p>Associated Opportunity ID: {AssociatedopportunityID}</p>
          <p>Buyer Agent: {BuyerAgent}</p>
          <p>Call Details: {CallDetails}</p>
          <p>Call End Time: {CallEndTime}</p>
          <p>Call Start Time: {CallStartTime}</p>
          <p>Contact Phone ID: {ContactPhoneID}</p>
          <p>Date Created: {DateCreated}</p>
          <p>First Name: {FirstName}</p>
          <p>Last Name: {LastName}</p>
          <p>Listing Agent: {ListingAgent}</p>
          <p>Log Type: {LogType}</p>
          <p>Media URL: {MediaURL}</p>
          <p>User ID: {UserID}</p>
          <p>Contact ID: {contactId}</p>
          <p>ID: {id}</p>
        </Alert>
      )}

    </>
  );
}





function CustomAlertSnackbar({ data }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      handleClose();
    }
  }, [open]);

  const {
    AssociatedopportunityID,
    BuyerAgent,
    CallDetails,
    CallEndTime,
    CallStartTime,
    ContactPhoneID,
    DateCreated,
    FirstName,
    LastName,
    ListingAgent,
    LogType,
    MediaURL,
    UserID,
    contactId,
    id,
  } = data;

  return (
    <>
      <Button onClick={handleClick}>Show Call</Button>

      {open && (
        <Alert onClose={handleClose} severity="info">
          <p>Associated Opportunity ID: {AssociatedopportunityID}</p>
          <p>Buyer Agent: {BuyerAgent}</p>
          <p>Call Details: {CallDetails}</p>
          <p>Call End Time: {CallEndTime}</p>
          <p>Call Start Time: {CallStartTime}</p>
          <p>Contact Phone ID: {ContactPhoneID}</p>
          <p>Date Created: {DateCreated}</p>
          <p>First Name: {FirstName}</p>
          <p>Last Name: {LastName}</p>
          <p>Listing Agent: {ListingAgent}</p>
          <p>Log Type: {LogType}</p>
          <p>Media URL: {MediaURL}</p>
          <p>User ID: {UserID}</p>
          <p>Contact ID: {contactId}</p>
          <p>ID: {id}</p>
        </Alert>
      )}

    </>
  );
}













const NoteSnackItem = (props) => {
  return (
    <div>
      <CustomNoteSnackbar
        sx={{backgroundColor: props.color, color: '#000000'}}
        data={props}
        action={props.action}
      />


    </div>
  );

  }


  const CallSnackItem = (props) => {
    return (
      <div>
        <SnackbarContent
          sx={{backgroundColor: props.color, color: '#000000'}}
          message={props.message}
          action={props.action}
        />
      </div>
    );
  
    }

const AlertSnackItem = (props) => {
  return (
    <div>

      
      <CustomSnackbar
        sx={{backgroundColor: props.color, color: '#000000'}}
        message={props.message}
        action={props.action}
      />
    </div>
  );

  }







export default function SnackBar(props) {

  const [UIColor, setUIColor] = React.useState(null);




  useEffect(() => {

    if(props.alerts){
      console.log(props.alerts)
    }

    if(props.type === 'Message'){
      console.log("message")
    console.log(props)
      setUIColor('#fcfceb')
    }else if(props.type === 'EAlerts'){
      console.log("ealert")
      console.log(props)
      setUIColor('#e6f2ff')
    }else if(props.type === 'Notes'){
      console.log("note")
      console.log(props)
      setUIColor('#f2f2f2')
    }
    
  
    return () => {
      
    }
  }, [])
  
  return (
    <Stack spacing={1} sx={{ maxWidth: 600 }}>


 {/* FETCH NOTES:  */}

      {props.notes? (
 props.notes.notes.map((note) => (

    <div key={note.id}>
        <CustomNoteSnackbar 
  sx={{backgroundColor: UIColor, color: '#000000'}}
  data={note}
  action={Noteaction} />

    </div>

  ))

      ): (null)}


      {props.calls? (
 props.calls.calls.map((call) => (

    <div key={call.id}>
        <CustomCallSnackbar 
  sx={{backgroundColor: UIColor, color: '#000000'}}
  data={call}
  action={Noteaction} />



    </div>


  ))

      ): (null)}




{props.alerts? (
 props.alerts.ealerts.map((alert) => (

    <div key={alert.id}>
        <CustomSnackbar 
  sx={{backgroundColor: UIColor, color: '#000000'}}
  data={alert}
  action={Alertaction} />

    </div>


  ))

      ): (null)}




{/* FETTCH E-ALERTS:  */}


{/* FETCH MESSAGES:  */}
















      {/* // HARD CODED NOTES:  */}

{/* 
      <SnackbarContent 
        sx={{backgroundColor: UIColor, color: '#000000'}}
        message="New Text" 
        action={Noteaction} />
      <SnackbarContent

sx={{backgroundColor: UIColor, color: '#000000'}}
        message={
          'New E-Alert. \
          from google'
        }
      />


      <SnackbarContent
       sx={{backgroundColor: UIColor, color: '#000000'}}
        message="New Alert!"
        action={Noteaction}
      />
      <SnackbarContent
       sx={{backgroundColor: UIColor, color: '#000000'}}
        message={
          'Acton Message. \
          New Message'
        }
        action={Noteaction}
      />




 */}



    </Stack>
  );
}