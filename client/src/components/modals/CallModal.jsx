import React , {useState} from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../iconify/Iconify';



export default function CallModal() {

  const [formData, setFormData] = useState({
    title: "",
    dateCreated: "",

  });

  const [uploadInProcess, setUploaded] = useState(false);



 const [open, setOpen] = React.useState(false);





  const handleClickOpen = () => {
    setOpen(true);
  };



  const handleChange = (event) => {

    event.persist();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });

    console.log(formData)

  };






  const handleClose = () => {
    setOpen(false);
  };





  return (

    <>
    { uploadInProcess ?( <div>
 

 <Button href="" sx={{borderRadius: '100px'}}>
      <Iconify icon="eva:phone-fill" color="#18712" width={22} height={22}  />
              </Button>
 <Dialog open={open} onClose={handleClose}>
   <DialogTitle>New Tag Info</DialogTitle>
   <DialogContent>
     <DialogContentText>
       Tell us about your new tag!
     </DialogContentText>


<Box>
<img src="https://img.freepik.com/premium-vector/3d-check-mark-icon-realistic-green-tick-button-isolated-white-background-vector-illustration_113065-1285.jpg" alt="CSV Upload" width="200" height="200" />

</Box>


   </DialogContent>
   <DialogActions>
      <Button onClick={handleClose}>Cancel</Button> 
    <Button onClick={() => setUploaded(false)}>Add Lead</Button> 
   </DialogActions>
 </Dialog>
</div> ) : ( <div>
 
    <Button href="" sx={{borderRadius: '100px'}}>
      <Iconify icon="eva:phone-fill" color="#18712" width={22} height={22}  />
     </Button>


 <Dialog open={open} onClose={handleClose}>
   <DialogTitle>New Lead Info</DialogTitle>
   <DialogContent>
     <DialogContentText>
       Tell us about your new lead!
     </DialogContentText>


 


<TextField
autoFocus
margin="dense"
id="title"
label="Title"
type="text"
fullWidth
variant="standard"
name="title"
value={formData.title}
onChange={handleChange}
/>

<TextField
autoFocus
margin="dense"
id="dateCreated"
label="Date Created"
type="text"
fullWidth
variant="standard"
name="dateCreated"
value={formData.dateCreated}
onChange={handleChange}
/>


   </DialogContent>
   <DialogActions>
     <Button onClick={handleClose}>Cancel</Button>
     <Button >Add Tag</Button>
   </DialogActions>
 </Dialog>
</div>)}
    
    </>
   
  );
}