import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FilterLeads = ({ filterLeadModal, setFilterLeadModal }) => {
  const handleFilter = (e) => {
    console.log(e);
  };
  return (
    <Dialog
      open={filterLeadModal}
      maxWidth="md"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ overflow: 'hidden' }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        Advanced Lead Filters{' '}
        <Button sx={{ color: 'gray' }} onClick={() => setFilterLeadModal(false)}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={{ overflowY: 'hidden' }}>
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          flexWrap="wrap"
          sx={{ borderTop: '1px solid #DADEE3', borderBottom: '1px solid #DADEE3', padding: '5px' }}
        >
          <Button sx={{ backgroundColor: '#fafafa', color: 'gray' }}>
            eAlerts <CloseIcon sx={{ height: '12px' }} />
          </Button>
        </Box>
        <Box display="flex" sx={{ borderBottom: '1px solid #DADEE3' }}>
          {/* sidebar */}
          <Box
            sx={{
              padding: '8px',
              maxHeight: '300px',
              overflowY: 'scroll',
              position: 'relative',
              flex: '.3',
              borderRight: '1px solid #DADEE3',
            }}
          >
            <Box display="flex" flexDirection="column" gap="15px">
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '1px', color: 'gray' }}
                onClick={() => handleFilter('firstName')}
              >
                First Name
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('lastName')}
              >
                Last Name
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('email')}
              >
                Email
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('Address')}
              >
                Address
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('AgentSelected')}
              >
                Agent Selected
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('AvgListingPrice')}
              >
                Avg Listing Price
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('Birthday')}
              >
                Birthday
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('BuyerAgent')}
              >
                Buyer Agent
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('BuyerAgentCategory')}
              >
                Buyer Agent Category
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('City')}
              >
                City
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('FirstVisitDate')}
              >
                First Visit Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('GloballyOptedOutOfAlerts')}
              >
                Globally Opted Out Of Alerts
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('GloballyOptedOutOfBuyerAgentEmail')}
              >
                Globally Opted Out Of Buyer Agent Email
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('GloballyOptedOutOfEmail')}
              >
                Globally Opted Out Of Email
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('GloballyOptedOutOfLenderEmail')}
              >
                Globally Opted Out Of Lender Email
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('GloballyOptedOutOfListingAgentEmail')}
              >
                Globally Opted Out Of Listing Agent Email
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('HomeClosingDate')}
              >
                Home Closing Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LastAgentCallDate')}
              >
                Last Agent Call Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LastAgentNote')}
              >
                Last Agent Note
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LastLenderCallDate')}
              >
                Last Lender Call Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LastVisitDate')}
              >
                Last Visit Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LeadType')}
              >
                Lead Type
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('Lender')}
              >
                Lender
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LenderCategory')}
              >
                Lender Category
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('LenderOptIn')}
              >
                Lender Opt In
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray' }}
                onClick={() => handleFilter('Link')}
              >
                Link
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('ListingAgent')}
              >
                Listing Agent
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('ListingAgentCategory')}
              >
                Listing Agent Category
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('NextCallDue')}
              >
                Next Call Due
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('OptInDate')}
              >
                Opt In Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('OriginalCampaign')}
              >
                Original Campaign
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('OriginalSource')}
              >
                Original Source
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('RegisterDate')}
              >
                Register Date
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('State')}
              >
                State
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('VisitTotal')}
              >
                Visit Total
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('ZipCode')}
              >
                ZipCode
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('description')}
              >
                Description
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('eAlerts')}
              >
                E Alerts
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('emailInvalid')}
              >
                Email Invalid
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('listingviewcount')}
              >
                Listing View Count
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('phone')}
              >
                Phone
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('phoneStatus')}
              >
                Phone Status
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('didLeaveReview')}
              >
                Did Leave Review
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('didClosingGift')}
              >
                Did Closing Gift
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('didsocialMediaFriends')}
              >
                Did Social Media Friends
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('didPostCardDrip')}
              >
                Did Post Card Drip
              </Button>
              <Button
                sx={{ fontWeight: '500', borderRadius: '0', justifyContent: 'start', padding: '0', color: 'gray,' }}
                onClick={() => handleFilter('didAnniversaryDrip')}
              >
                Did Anniversary Drip
              </Button>
            </Box>
          </Box>
          {/* aside content */}
          <Box flex=".7" padding="20px">
            <Autocomplete
              options={['One', 'Two', 'Three']}
              renderInput={(params) => (
                <TextField {...params} label="Lender" variant="outlined" fullWidth size="small" />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
        <Button onClick={() => setFilterLeadModal(false)} variant="outlined" sx={{ padding: '5px 16px' }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }}>
          View Results
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterLeads;
