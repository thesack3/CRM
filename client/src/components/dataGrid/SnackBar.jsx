import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import { BsChatText, BsJournal } from 'react-icons/bs';

const action = (
  <Button color="secondary" size="small" sx={{height: '10px'}}>
     <p style={{marginRight: '5px'}}>From: Bryan</p> <BsChatText/>
  </Button>
);
const Noteaction = (
  <Button color="secondary" size="small" sx={{height: '10px'}}>
     <p style={{marginRight: '5px'}}>From: Jake</p> <BsJournal/>
  </Button>
);
const Alertactio = (
  <Button color="secondary" size="small" sx={{height: '10px'}}>
     <p style={{marginRight: '5px'}}>From: Jake</p> <BsChatText/>
  </Button>
);


export default function SnackBar(props) {

  const [UIColor, setUIColor] = React.useState(null);




  useEffect(() => {

    if(props.alerts){
      console.log(props.alerts)
    }

    if(props.type === 'Message'){

      setUIColor('#fcfceb')
    }else if(props.type === 'EAlerts'){
      setUIColor('#e6f2ff')
    }else if(props.type === 'Notes'){
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
        <SnackbarContent 
  sx={{backgroundColor: UIColor, color: '#000000'}}
  message={note.FirstName}
  action={Noteaction} />

    </div>

  ))

      ): (null)}


      {props.calls? (
 props.calls.calls.map((call) => (

    <div key={call.id}>
        <SnackbarContent 
  sx={{backgroundColor: UIColor, color: '#000000'}}
  message={call.FirstName}
  action={Noteaction} />

    </div>


  ))

      ): (null)}




{props.alerts? (
 props.alerts.ealerts.map((alert) => (

    <div key={alert.id}>
        <SnackbarContent 
  sx={{backgroundColor: UIColor, color: '#000000'}}
  message={alert.FirstName}
  action={Noteaction} />

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