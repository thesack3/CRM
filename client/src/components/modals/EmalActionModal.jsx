import * as React from 'react';
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';

import { BsCheckCircle } from 'react-icons/bs';
import { CircularProgress } from '@mui/material';
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
import { ADD_LEAD } from '../../mutations/leadMutations';
import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';

export default function EmailActionModal({ Massemails }) {
  const [sendEmails, { loading, error, data }] = useMutation(SEND_EMAILS_MUTATION);

  const [formData, setFormData] = useState({
    subject: '',
    body: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSendEmails = async () => {
    setIsSending(true);
    try {
      const result = await sendEmails({
        variables: {
          emails: Massemails,
          subject: formData.subject,
          body: formData.body,
        },
      });
      console.log(result.data.sendEmails); // Output: [{subject: 'Test Subject', body: 'Test Body'}]
      setIsSending(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error(error);
      setIsSending(false);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowConfirmation(false);
  };

  // Render the list of queued emails
  const queuedEmails = Massemails.slice(0, 10).map((email) => (
    <div key={email} style={{ color: '#aaa', fontSize: '0.8rem', display: 'flex', flexDirection: 'row' }}>
      {email}
    </div>
  ));

  return (
    <div style={{ margin: '10px' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Bulk Email
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bulk Email</DialogTitle>
        <DialogContent>
          <DialogContentText>Mass email:</DialogContentText>

          {/* Show the list of queued emails */}
          {queuedEmails}

          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'red' }}>
            Cancel
          </Button>

          <Button onClick={handleSendEmails}>
            {isSending ? (
              <Box display="flex" alignItems="center">
                <span>Sending...</span>
                <Box ml={1}>
                  <CircularProgress size={20} thickness={4} />
                </Box>
              </Box>
            ) : (
              <span>
                SEND EMAILS <BsCheckCircle style={{ marginLeft: 5 }} />
              </span>
            )}
          </Button>
        </DialogActions>
      </Dialog>{' '}
      {/* Show confirmation message */}
      {showConfirmation && (
        <Box display="flex" alignItems="center" style={{ marginTop: 10 }}>
          <BsCheckCircle style={{ color: 'green', marginRight: 5 }} />
          <span>Emails sent successfully!</span>
        </Box>
      )}
    </div>
  );
}

// import * as React from 'react';
// import { useState } from 'react';
// import { useMutation } from '@apollo/client';

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import { Box } from '@mui/system';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CsvUpload from '../DropBoxes/CsvUpload';
// import DataGridCSV from '../dataGrid/DataGridCSV';
// import styles from './AddCSVLeadsModal.module.css';
// import { ADD_LEAD } from '../../mutations/leadMutations';
// import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';

// export default function EmailActionModal({ Massemails }) {

//   const [sendEmails, { loading, error, data }] = useMutation(SEND_EMAILS_MUTATION);

//   const [formData, setFormData] = useState({
//     subject: '',
//     body: '',
//   });
//   const handleSendEmails = async () => {
//     try {
//       const result = await sendEmails({
//         variables: {
//           emails: Massemails,
//           subject: formData.subject,
//           body: formData.body
//         }
//       });
//       console.log(result.data.sendEmails); // Output: [{subject: 'Test Subject', body: 'Test Body'}]
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div style={{margin: '10px'}}>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Bulk Email
//       </Button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Bulk Email</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Mass email
//           </DialogContentText>

//           <TextField
//             autoFocus
//             margin="dense"
//             id="subject"
//             label="Subject"
//             type="text"
//             fullWidth
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//           />

//           <TextField
//             margin="dense"
//             id="body"
//             label="Body"
//             type="text"
//             fullWidth
//             name="body"
//             value={formData.body}
//             onChange={handleChange}
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose} sx={{ color: "red" }}>
//             Cancel
//           </Button>

//           <Button onClick={handleSendEmails}>
//             SEND EMAILS
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
