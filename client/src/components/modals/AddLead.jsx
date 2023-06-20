import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CsvUpload from '../DropBoxes/CsvUpload';
import { ADD_LEAD, updateLeadMutation } from '../../mutations/leadMutations';
import { setAlert } from '../../redux/slice/alertSlice';

export default function AddLeadModal({ handleRefetch, title, leadData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addLead, { loading, error, data }] = useMutation(ADD_LEAD);
  const [UpdateLead] = useMutation(updateLeadMutation);
  const [uploadInProcess, setUploaded] = useState(false);
  const [curLead, setCurLead] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    lastName: '',
    phone: '',
    phoneStatus: '',
    descritpion: '',
    emailInvalid: '',
    GloballyOptedOutOfEmail: '',
    GloballyOptedOutOfBuyerAgentEmail: '',
    GloballyOptedOutOfListingAgentEmail: '',
    GloballyOptedOutOfLenderEmail: '',
    GloballyOptedOutOfAlerts: '',
    // OptInDate: '',
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
    Tags: [],
    Link: '',
    Birthday: '',
    HomeClosingDate: '',
  });

  React.useEffect(() => {
    setCurLead(leadData);
  }, [leadData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    event.persist();
    if (curLead) {
      setCurLead({
        ...curLead,
        [event.target.name]: event.target.value,
      });
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    addLead({
      variables: formData,
    })
      .then((res) => {
        const leadId = res.data.addLead.id;
        setFormData({
          firstName: '',
          email: '',
          lastName: '',
          phone: '',
          phoneStatus: '',
          emailInvalid: '',
          GloballyOptedOutOfEmail: '',
          GloballyOptedOutOfBuyerAgentEmail: '',
          GloballyOptedOutOfListingAgentEmail: '',
          GloballyOptedOutOfLenderEmail: '',
          GloballyOptedOutOfAlerts: '',
          // OptInDate: '',
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
          Tags: [],
          Link: '',
          Birthday: '',
          HomeClosingDate: '',
          didLeaveReview: '',
          didClosingGift: '',
          didsocialMediaFriends: '',
          didPostCardDrip: '',
          didAnniversaryDrip: '',
        });
        setUploaded(false);
        handleRefetch();
        handleClose();
        dispatch(setAlert({ type: 'success', message: 'Lead added successfully' }));
        navigate(`/lead/${leadId}`);
      })
      .catch((err) => {
        dispatch(setAlert({ type: 'error', message: 'Error adding lead' }));
      });
  };

  // handle update
  const handleUpdate = async () => {
    try {
      await UpdateLead({
        variables: curLead,
      });
      dispatch(setAlert({ type: 'success', message: 'Lead updated successfully' }));
    } catch (error) {
      dispatch(setAlert({ type: 'error', payload: error.message }));
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      {uploadInProcess ? (
        <div>
          <Button variant="outlined" sx={{ backgroundColor: 'white' }} onClick={handleClickOpen}>
            {title}
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Lead Info</DialogTitle>
            <DialogContent>
              <DialogContentText>Tell us about your new lead!</DialogContentText>

              <Box>
                <img
                  src="https://img.freepik.com/premium-vector/3d-check-mark-icon-realistic-green-tick-button-isolated-white-background-vector-illustration_113065-1285.jpg"
                  alt="CSV Upload"
                  width="200"
                  height="200"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => setUploaded(false)}>Add Lead</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            {title}
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Lead Info</DialogTitle>
            <DialogContent>
              <DialogContentText>Tell us about your new lead!</DialogContentText>

              {/* <Button variant="outlined" onClick={handleClickOpen}>
 {CsvUpload()}
 </Button> */}

              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                name="firstName"
                value={curLead ? curLead.firstName : formData.firstName}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                name="email"
                value={curLead ? curLead.email : formData.email}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                name="lastName"
                value={curLead ? curLead.lastName : formData.lastName}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone"
                type="text"
                fullWidth
                variant="standard"
                name="phone"
                value={curLead ? curLead.phone : formData.phone}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="phoneStatus"
                label="Phone Status"
                type="text"
                fullWidth
                variant="standard"
                name="phoneStatus"
                value={curLead ? curLead.phoneStatus : formData.phoneStatus}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="emailInvalid"
                label="Email Invalid"
                type="text"
                fullWidth
                variant="standard"
                name="emailInvalid"
                value={curLead ? curLead.emailInvalid : formData.emailInvalid}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="GloballyOptedOutOfEmail"
                label="Globally Opted Out Of Email"
                type="text"
                fullWidth
                variant="standard"
                name="GloballyOptedOutOfEmail"
                value={curLead ? curLead.GloballyOptedOutOfEmail : formData.GloballyOptedOutOfEmail}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="GloballyOptedOutOfBuyerAgentEmail"
                label="Globally Opted Out Of Buyer Agent Email"
                type="text"
                fullWidth
                variant="standard"
                name="GloballyOptedOutOfBuyerAgentEmail"
                value={curLead ? curLead.GloballyOptedOutOfBuyerAgentEmail : formData.GloballyOptedOutOfBuyerAgentEmail}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="GloballyOptedOutOfListingAgentEmail"
                label="Globally Opted Out Of Listing Agent Email"
                type="text"
                fullWidth
                variant="standard"
                name="GloballyOptedOutOfListingAgentEmail"
                value={
                  curLead ? curLead.GloballyOptedOutOfListingAgentEmail : formData.GloballyOptedOutOfListingAgentEmail
                }
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="GloballyOptedOutOfLenderEmail"
                label="Globally Opted Out Of Lender Email"
                type="text"
                fullWidth
                variant="standard"
                name="GloballyOptedOutOfLenderEmail"
                value={curLead ? curLead.GloballyOptedOutOfLenderEmail : formData.GloballyOptedOutOfLenderEmail}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="GloballyOptedOutOfAlerts"
                label="Globally Opted Out Of Alerts"
                type="text"
                fullWidth
                variant="standard"
                name="GloballyOptedOutOfAlerts"
                value={curLead ? curLead.GloballyOptedOutOfAlerts : formData.GloballyOptedOutOfAlerts}
                onChange={handleChange}
              />

              {/* <TextField
                autoFocus
                margin="dense"
                id="OptInDate"
                label="Opt In Date"
                type="date"
                fullWidth
                variant="standard"
                name="OptInDate"
                value={curLead ? curLead.OptInDate : formData.OptInDate}
                onChange={handleChange}
              /> */}

              <TextField
                autoFocus
                margin="dense"
                id="BuyerAgentCategory"
                label="Buyer Agent Category"
                type="text"
                fullWidth
                variant="standard"
                name="BuyerAgentCategory"
                value={curLead ? curLead.BuyerAgentCategory : formData.BuyerAgentCategory}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="ListingAgentCategory"
                label="Listing Agent Category"
                type="text"
                fullWidth
                variant="standard"
                name="ListingAgentCategory"
                value={curLead ? curLead.ListingAgentCategory : formData.ListingAgentCategory}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LenderCategory"
                label="Lender Category"
                type="text"
                fullWidth
                variant="standard"
                name="LenderCategory"
                value={curLead ? curLead.LenderCategory : formData.LenderCategory}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="BuyerAgent"
                label="Buyer Agent"
                type="text"
                fullWidth
                variant="standard"
                name="BuyerAgent"
                value={curLead ? curLead.BuyerAgent : formData.BuyerAgent}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="ListingAgent"
                label="Listing Agent"
                type="text"
                fullWidth
                variant="standard"
                name="ListingAgent"
                value={curLead ? curLead.ListingAgent : formData.ListingAgent}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Lender"
                label="Lender"
                type="text"
                fullWidth
                variant="standard"
                name="Lender"
                value={curLead ? curLead.Lender : formData.Lender}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="OriginalSource"
                label="Original Source"
                type="text"
                fullWidth
                variant="standard"
                name="OriginalSource"
                value={curLead ? curLead.OriginalSource : formData.OriginalSource}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="OriginalCampaign"
                label="Original Campaign"
                type="text"
                fullWidth
                variant="standard"
                name="OriginalCampaign"
                value={curLead ? curLead.OriginalCampaign : formData.OriginalCampaign}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LastAgentNote"
                label="Last Agent Note"
                type="text"
                fullWidth
                variant="standard"
                name="LastAgentNote"
                value={curLead ? curLead.LastAgentNote : formData.LastAgentNote}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="eAlerts"
                label="E-Alerts"
                type="text"
                fullWidth
                variant="standard"
                name="eAlerts"
                value={curLead ? curLead.eAlerts : formData.eAlerts}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="VisitTotal"
                label="Visit Total"
                type="text"
                fullWidth
                variant="standard"
                name="VisitTotal"
                value={curLead ? curLead.VisitTotal : formData.VisitTotal}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="listingviewcount"
                label="Listing View Count"
                type="text"
                fullWidth
                variant="standard"
                name="listingviewcount"
                value={curLead ? curLead.listingviewcount : formData.listingviewcount}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="AvgListingPrice"
                label="Average Listing Price"
                type="text"
                fullWidth
                variant="standard"
                name="AvgListingPrice"
                value={curLead ? curLead.AvgListingPrice : formData.AvgListingPrice}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="NextCallDue"
                label="Next Call Due"
                type="text"
                fullWidth
                variant="standard"
                name="NextCallDue"
                value={curLead ? curLead.NextCallDue : formData.NextCallDue}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LastAgentCallDate"
                label="Last Agent Call Date"
                type="date"
                fullWidth
                variant="standard"
                name="LastAgentCallDate"
                value={curLead ? curLead.LastAgentCallDate : formData.LastAgentCallDate}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LastLenderCallDate"
                label="Last Lender Call Date"
                type="date"
                fullWidth
                variant="standard"
                name="LastLenderCallDate"
                value={curLead ? curLead.LastLenderCallDate : formData.LastLenderCallDate}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="FirstVisitDate"
                label="FirstVisitDate"
                type="date"
                fullWidth
                variant="standard"
                name="FirstVisitDate"
                value={curLead ? curLead.FirstVisitDate : formData.FirstVisitDate}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LastVisitDate"
                label="LastVisitDate"
                type="date"
                fullWidth
                variant="standard"
                name="LastVisitDate"
                value={curLead ? curLead.LastVisitDate : formData.LastVisitDate}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="RegisterDate"
                label="RegisterDate"
                type="date"
                fullWidth
                variant="standard"
                name="RegisterDate"
                value={curLead ? curLead.RegisterDate : formData.RegisterDate}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LeadType"
                label="LeadType"
                type="text"
                fullWidth
                variant="standard"
                name="LeadType"
                value={curLead ? curLead.LeadType : formData.LeadType}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="AgentSelected"
                label="AgentSelected"
                type="text"
                fullWidth
                variant="standard"
                name="AgentSelected"
                value={curLead ? curLead.AgentSelected : formData.AgentSelected}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="LenderOptIn"
                label="LenderOptIn"
                type="text"
                fullWidth
                variant="standard"
                name="LenderOptIn"
                value={curLead ? curLead.LenderOptIn : formData.LenderOptIn}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                name="Address"
                value={curLead ? curLead?.Address : formData.Address}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="City"
                label="City"
                type="text"
                fullWidth
                variant="standard"
                name="City"
                value={curLead ? curLead.City : formData.City}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="State"
                label="State"
                type="text"
                fullWidth
                variant="standard"
                name="State"
                value={curLead ? curLead.State : formData.State}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="ZipCode"
                label="ZipCode"
                type="text"
                fullWidth
                variant="standard"
                name="ZipCode"
                value={curLead ? curLead.ZipCode : formData.ZipCode}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Tags"
                label="Tags"
                type="text"
                fullWidth
                variant="standard"
                name="Tags"
                value={curLead ? curLead.Tags : formData.Tags}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Link"
                label="Link"
                type="text"
                fullWidth
                variant="standard"
                name="Link"
                value={curLead ? curLead.Link : formData.Link}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Birthday"
                label="Birthday"
                type="text"
                fullWidth
                variant="standard"
                name="Birthday"
                value={curLead ? curLead.Birthday : formData.Birthday}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="HomeClosingDate"
                label="Home Closing Date"
                type="date"
                fullWidth
                variant="standard"
                name="HomeClosingDate"
                value={curLead ? curLead.HomeClosingDate : formData.HomeClosingDate}
                onChange={handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                id="didLeaveReview"
                label="Did Leave Review"
                type="text"
                fullWidth
                variant="standard"
                name="didLeaveReview"
                value={curLead ? curLead.didLeaveReview : formData.didLeaveReview}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="didClosingGift"
                label="Did Closing Gift"
                type="text"
                fullWidth
                variant="standard"
                name="didClosingGift"
                value={curLead ? curLead.didClosingGift : formData.didClosingGift}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="didsocialMediaFriends"
                label="Did Social Media Friends"
                type="text"
                fullWidth
                variant="standard"
                name="didsocialMediaFriends"
                value={curLead ? curLead.didsocialMediaFriends : formData.didsocialMediaFriends}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="didPostCardDrip"
                label="Did Post Card Drip"
                type="text"
                fullWidth
                variant="standard"
                name="didPostCardDrip"
                value={curLead ? curLead.didPostCardDrip : formData.didPostCardDrip}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="didAnniversaryDrip"
                label="Did Anniversary Drip"
                type="text"
                fullWidth
                variant="standard"
                name="didAnniversaryDrip"
                value={curLead ? curLead.didAnniversaryDrip : formData.didAnniversaryDrip}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {curLead ? (
                <Button onClick={handleUpdate}>Update Lead</Button>
              ) : (
                <Button onClick={handleLeadSubmit}>Add Lead</Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
