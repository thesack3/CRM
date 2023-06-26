import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@apollo/client';
import { GET_LEADS_VALUES } from '../../queries/leadQueries';

const FilterLeads = ({
  filterLeadModal,
  setFilterLeadModal,
  callback,
  categories,
  handleActiveCategory,
  tags,
  handleActiveTag,
}) => {
  const [label, setLable] = useState('Address');
  const [fieldValue, setFieldValue] = useState('Address');
  const [filterValue, setFilterValue] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [fieldListValue, setFieldListValue] = useState('');
  const [fieldsListData, setFieldsListData] = useState(fieldsList);

  const { data, loading } = useQuery(GET_LEADS_VALUES, {
    variables: {
      label: filterValue || '',
      value: fieldValue || 'Address',
    },
  });

  useEffect(() => {
    if (!fieldListValue) {
      setFieldsListData(fieldsList);
      return;
    }

    const filteredFields = fieldsListData.filter((item) => item.label.toLowerCase().includes(fieldListValue));
    setFieldsListData(filteredFields);
  }, [fieldListValue]);

  const handleFilter = ({ label, value }) => {
    setLable(label);
    setFieldValue(value);
    setFilterValue('');
    setFrom('');
    setTo('');
  };

  const handleOnChange = (e, value) => {
    setFilterValue(value);
    callback({ label: fieldValue, value });
    setFilterLeadModal(false);
  };

  const handleSubmit = () => {
    if (from && to) {
      callback({ label: fieldValue, value: filterValue, from, to });
      setFilterLeadModal(false);
      return;
    }
    if (startDate && endDate) {
      callback({ label: fieldValue, value: filterValue, from: startDate, to: endDate });
      setFilterLeadModal(false);
      return;
    }
    if (selectedCategories.length) {
      handleActiveCategory(selectedCategories);
      setFilterLeadModal(false);
      return;
    }
    if (selectedTags.length) {
      handleActiveTag(selectedTags);
      setFilterLeadModal(false);
      return;
    }
  };

  const handleCategoryClick = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
      return;
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleTagClick = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((item) => item !== value));
      return;
    } else {
      setSelectedTags([...selectedTags, value]);
    }
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
              {/* add search field for the fieldsList */}
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ width: '100%' }}
                placeholder="Search"
                value={fieldListValue}
                onChange={(e) => {
                  // filter fields then set the filtered fields to the fieldsList
                  setFieldListValue(e.target.value);
                }}
              />

              {
                // map the fieldsList and sort them alphabetically
                fieldsListData
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((item) => (
                    <Button
                      sx={{
                        fontWeight: '500',
                        borderRadius: '0',
                        justifyContent: 'start',
                        padding: '1px',
                        color: 'gray',
                        textAlign: 'left!important',
                      }}
                      onClick={() =>
                        handleFilter({
                          label: item.label,
                          value: item.value,
                        })
                      }
                    >
                      {item.label}
                    </Button>
                  ))
              }
              <Box>
                {/* <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'First Name',
                    value: 'firstName',
                  })
                }
              >
                First Name
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Last Name',
                    value: 'lastName',
                  })
                }
              >
                Last Name
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Email',
                    value: 'email',
                  })
                }
              >
                Email
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Address',
                    value: 'Address',
                  })
                }
              >
                Address
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Agent Selected',
                    value: 'AgentSelected',
                  })
                }
              >
                Agent Selected
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Avg Listing Price',
                    value: 'AvgListingPrice',
                  })
                }
              >
                Avg Listing Price
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Birthday',
                    value: 'Birthday',
                  })
                }
              >
                Birthday
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Buyer Agent',
                    value: 'BuyerAgent',
                  })
                }
              >
                Buyer Agent
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Buyer Agent Category',
                    value: 'BuyerAgentCategory',
                  })
                }
              >
                Buyer Agent Category
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'City',
                    value: 'City',
                  })
                }
              >
                City
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'First Visit Date',
                    value: 'FirstVisitDate',
                  })
                }
              >
                First Visit Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Globally Opted Out Of Alerts',
                    value: 'GloballyOptedOutOfAlerts',
                  })
                }
              >
                Globally Opted Out Of Alerts
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Globally Opted Out Of Buyer Agent Email',
                    value: 'GloballyOptedOutOfBuyerAgentEmail',
                  })
                }
              >
                Globally Opted Out Of Buyer Agent Email
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Globally Opted Out Of Email',
                    value: 'GloballyOptedOutOfEmail',
                  })
                }
              >
                Globally Opted Out Of Email
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Globally Opted Out Of Lender Email',
                    value: 'GloballyOptedOutOfLenderEmail',
                  })
                }
              >
                Globally Opted Out Of Lender Email
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Globally Opted Out Of Listing Agent Email',
                    value: 'GloballyOptedOutOfListingAgentEmail',
                  })
                }
              >
                Globally Opted Out Of Listing Agent Email
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Home Closing Date',
                    value: 'HomeClosingDate',
                  })
                }
              >
                Home Closing Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Last Agent Call Date',
                    value: 'LastAgentCallDate',
                  })
                }
              >
                Last Agent Call Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Last Agent Note',
                    value: 'LastAgentNote',
                  })
                }
              >
                Last Agent Note
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Last Lender Call Date',
                    value: 'LastLenderCallDate',
                  })
                }
              >
                Last Lender Call Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Last Visit Date',
                    value: 'LastVisitDate',
                  })
                }
              >
                Last Visit Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Lead Type',
                    value: 'LeadType',
                  })
                }
              >
                Lead Type
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Lender',
                    value: 'Lender',
                  })
                }
              >
                Lender
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Lender Category',
                    value: 'LenderCategory',
                  })
                }
              >
                Lender Category
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Lender Opt In',
                    value: 'LenderOptIn',
                  })
                }
              >
                Lender Opt In
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Link',
                    value: 'Link',
                  })
                }
              >
                Link
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Listing Agent',
                    value: 'ListingAgent',
                  })
                }
              >
                Listing Agent
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Listing Agent Category',
                    value: 'ListingAgentCategory',
                  })
                }
              >
                Listing Agent Category
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Next Call Due',
                    value: 'NextCallDue',
                  })
                }
              >
                Next Call Due
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Opt In Date',
                    value: 'OptInDate',
                  })
                }
              >
                Opt In Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Original Campaign',
                    value: 'OriginalCampaign',
                  })
                }
              >
                Original Campaign
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Original Source',
                    value: 'OriginalSource',
                  })
                }
              >
                Original Source
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Register Date',
                    value: 'RegisterDate',
                  })
                }
              >
                Register Date
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'State',
                    value: 'State',
                  })
                }
              >
                State
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Visit Total',
                    value: 'VisitTotal',
                  })
                }
              >
                Visit Total
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Zip Code',
                    value: 'ZipCode',
                  })
                }
              >
                ZipCode
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Description',
                    value: 'description',
                  })
                }
              >
                Description
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'eAlerts',
                    value: 'eAlerts',
                  })
                }
              >
                E Alerts
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Email Invalid',
                    value: 'emailInvalid',
                  })
                }
              >
                Email Invalid
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Listing View Count',
                    value: 'listingviewcount',
                  })
                }
              >
                Listing View Count
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Phone',
                    value: 'phone',
                  })
                }
              >
                Phone
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Phone Status',
                    value: 'phoneStatus',
                  })
                }
              >
                Phone Status
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Did Leave Review',
                    value: 'didLeaveReviews',
                  })
                }
              >
                Did Leave Review
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Did Closing Gift',
                    value: 'didClosingGift',
                  })
                }
              >
                Did Closing Gift
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Did Social Media Friends',
                    value: 'didsocialMediaFriends',
                  })
                }
              >
                Did Social Media Friends
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Did Post Card Drip',
                    value: 'didPostCardDrip',
                  })
                }
              >
                Did Post Card Drip
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Did Anniversary Drip',
                    value: 'didAnniversaryDrip',
                  })
                }
              >
                Did Anniversary Drip
              </Button>

              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Category',
                    value: 'category',
                  })
                }
              >
                Categories
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Tags',
                    value: 'tags',
                  })
                }
              >
                Tags
              </Button>
              <Button
                sx={{
                  fontWeight: '500',
                  borderRadius: '0',
                  justifyContent: 'start',
                  padding: '1px',
                  color: 'gray',
                  textAlign: 'left!important',
                }}
                onClick={() =>
                  handleFilter({
                    label: 'Updated At',
                    value: 'updatedAt',
                  })
                }
              >
                Updated At
              </Button> */}
              </Box>
            </Box>
          </Box>
          {/* aside content */}
          {fieldValue == 'Birthday' ||
          fieldValue == 'FirstVisitDate' ||
          fieldValue == 'HomeClosingDate' ||
          fieldValue == 'LastAgentCallDate' ||
          fieldValue == 'LastVisitDate' ||
          fieldValue == 'OptInDate' ||
          fieldValue == 'RegisterDate' ||
          fieldValue == 'LastLenderCallDate' ||
          fieldValue == 'updatedAt' ? (
            <Box>
              {/* add two fields for date range */}
              <Box display="flex" flexDirection="row" alignItems={'center'} gap="10px" padding="20px">
                <Typography variant="subtitle1">From</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="date"
                  sx={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setFrom('');
                    setTo('');
                  }}
                />

                <Typography variant="subtitle1">To</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="date"
                  sx={{ width: '100%' }}
                  value={endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setFrom('');
                    setTo('');
                  }}
                />
              </Box>
            </Box>
          ) : fieldValue == 'AvgListingPrice' || fieldValue == 'VisitTotal' || fieldValue == 'listingviewcount' ? (
            <Box flex=".7" padding="20px">
              <Box display="flex" flexDirection="row" alignItems={'center'} gap="10px">
                <Typography variant="subtitle1">From</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setEndDate('');
                    setStartDate('');
                  }}
                />

                <Typography variant="subtitle1">To</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setEndDate('');
                    setStartDate('');
                  }}
                />
              </Box>
            </Box>
          ) : fieldValue == 'category' ? (
            <Box flex=".7" padding="20px">
              <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>
                Select Category
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {categories.map((category) => {
                  if ('closed' == category.title.toLowerCase()) return;
                  return (
                    <Box display="flex" flexDirection="row" alignItems={'center'} gap="10px">
                      <Button
                        onClick={() => handleCategoryClick(category.title)}
                        sx={{
                          color: '#000',
                          border: `1px solid ${category?.color || '#e3e3e3'}`,
                          backgroundColor: `${
                            selectedCategories.includes(category.title) ? category?.color || '#0ae7b6' : ''
                          }`,
                        }}
                      >
                        {category.title}
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ) : fieldValue == 'tags' ? (
            <Box flex=".7" padding="20px">
              <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>
                Select Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {tags?.map((tag) => {
                  return (
                    <Box display="flex" flexDirection="row" alignItems={'center'} gap="10px">
                      <Button
                        onClick={() => handleTagClick(tag.title)}
                        sx={{
                          color: '#000',
                          border: `1px solid ${tag?.color || '#e3e3e3'}`,
                          backgroundColor: `${selectedTags.includes(tag.title) ? '#0ae7b6' : ''}`,
                        }}
                      >
                        {tag.title}
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ) : loading ? (
            <Box flex=".7" padding="20px">
              <CircularProgress />
            </Box>
          ) : (
            <Box flex=".7" padding="20px">
              <Autocomplete
                options={data ? data?.leadFilter : []}
                onChange={(e, value) => handleOnChange(e, value)}
                value={filterValue}
                renderInput={(params) => (
                  <TextField {...params} label={label} variant="outlined" fullWidth size="small" value={fieldValue} />
                )}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'right', gap: '5px' }}>
        <Button onClick={() => setFilterLeadModal(false)} variant="outlined" sx={{ padding: '5px 16px' }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ padding: '6px 26px', color: '#fff' }} onClick={handleSubmit}>
          View Results
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterLeads;

const fieldsList = [
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Address',
    value: 'Address',
  },
  {
    label: 'Agent Selected',
    value: 'AgentSelected',
  },
  {
    label: 'Avg Listing Price',
    value: 'AvgListingPrice',
  },
  {
    label: 'Birthday',
    value: 'Birthday',
  },
  {
    label: 'Buyer Agent',
    value: 'BuyerAgent',
  },
  {
    label: 'Buyer Agent Category',
    value: 'BuyerAgentCategory',
  },
  {
    label: 'City',
    value: 'City',
  },
  {
    label: 'First Visit Date',
    value: 'FirstVisitDate',
  },
  {
    label: 'Globally Opted Out Of Alerts',
    value: 'GloballyOptedOutOfAlerts',
  },
  {
    label: 'Globally Opted Out Of Buyer Agent Email',
    value: 'GloballyOptedOutOfBuyerAgentEmail',
  },
  {
    label: 'Globally Opted Out Of Email',
    value: 'GloballyOptedOutOfEmail',
  },
  {
    label: 'Globally Opted Out Of Lender Email',
    value: 'GloballyOptedOutOfLenderEmail',
  },
  {
    label: 'Globally Opted Out Of Listing Agent Email',
    value: 'GloballyOptedOutOfListingAgentEmail',
  },
  {
    label: 'Home Closing Date',
    value: 'HomeClosingDate',
  },
  {
    label: 'Last Agent Call Date',
    value: 'LastAgentCallDate',
  },
  {
    label: 'Last Agent Note',
    value: 'LastAgentNote',
  },
  {
    label: 'Last Lender Call Date',
    value: 'LastLenderCallDate',
  },
  {
    label: 'Last Visit Date',
    value: 'LastVisitDate',
  },
  {
    label: 'Lead Type',
    value: 'LeadType',
  },
  {
    label: 'Lender',
    value: 'Lender',
  },
  {
    label: 'Lender Category',
    value: 'LenderCategory',
  },
  {
    label: 'Lender Opt In',
    value: 'LenderOptIn',
  },
  {
    label: 'Link',
    value: 'Link',
  },
  {
    label: 'Listing Agent',
    value: 'ListingAgent',
  },
  {
    label: 'Listing Agent Category',
    value: 'ListingAgentCategory',
  },
  {
    label: 'Next Call Due',
    value: 'NextCallDue',
  },
  {
    label: 'Opt In Date',
    value: 'OptInDate',
  },
  {
    label: 'Original Campaign',
    value: 'OriginalCampaign',
  },
  {
    label: 'Original Source',
    value: 'OriginalSource',
  },
  {
    label: 'Register Date',
    value: 'RegisterDate',
  },
  {
    label: 'State',
    value: 'State',
  },
  {
    label: 'Visit Total',
    value: 'VisitTotal',
  },
  {
    label: 'Zip Code',
    value: 'ZipCode',
  },
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'eAlerts',
    value: 'eAlerts',
  },
  {
    label: 'Email Invalid',
    value: 'emailInvalid',
  },

  {
    label: 'Listing View Count',
    value: 'listingviewcount',
  },
  {
    label: 'Phone',
    value: 'phone',
  },
  {
    label: 'Phone Status',
    value: 'phoneStatus',
  },
  {
    label: 'Did Leave Review',
    value: 'didLeaveReviews',
  },
  {
    label: 'Did Closing Gift',
    value: 'didClosingGift',
  },
  {
    label: 'Did Social Media Friends',
    value: 'didsocialMediaFriends',
  },
  {
    label: 'Did Post Card Drip',
    value: 'didPostCardDrip',
  },
  {
    label: 'Did Anniversary Drip',
    value: 'didAnniversaryDrip',
  },
  {
    label: 'Category',
    value: 'category',
  },
  {
    label: 'Tags',
    value: 'tags',
  },
  {
    label: 'Updated At',
    value: 'updatedAt',
  },
];
