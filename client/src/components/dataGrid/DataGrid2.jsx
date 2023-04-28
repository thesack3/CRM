// TODO: add subscription to update the table when a new lead is added, NEW_LEAD_SUBSCRIPTION
import * as React from 'react';
import { Button, MenuItem, TextField, Typography, Alert, Snackbar } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import CellBox from '../CellBox';
import { GET_LEADS } from '../../queries/leadQueries';
import ProfileDetailsPage from '../ProfileDetailsPage';
import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';
import CategoryBoxView from '../inputs/SearchCategory';
import TagBoxView from '../inputs/SearchTagBoxView';
import AddLeadModal from '../modals/AddLead';
import AddCSVLeadModal from '../modals/AddCSVLeadModal';
import AddTagModal from '../modals/AddTag';
import AddCategoryModal from '../modals/AddCategory';
import CategoryGrid from '../inputs/CategorySearchBox';
import { selectedCols } from '../../constants/arrays';
import { gridStyles } from '../../constants/styles';
import SelectField from '../SelectField';
import { GET_CATEGORIES } from '../../queries/categoryQueries';
import { GET_TAGS } from '../../queries/tagQueries';
import { updateLeadMutation } from '../../mutations/leadMutations';

export default function DataGridProCSV2(props) {
  const [open, setOpen] = React.useState(false);
  const [refetchCategories, setRefetchCategories] = useState('');
  const [refetchTag, setRefetchTag] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(selectedCols);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const [gridRef, setGridRef] = useState({});
  const [openSnack, setOpenSnack] = React.useState(false);
  const [responseData, setResponseData] = useState([]);
  const [rowSelectedUsers, setRowSelectedUsers] = useState(['dominiqmartinez13@gmail.com', 'unhashlabs@gmail.com']);

  const { loading: graphQLClientsLoading, error: graphQLClientsError, data, refetch } = useQuery(GET_LEADS);
  const { loading: categoryLoading, error, data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: tagData, loading: tagLoading } = useQuery(GET_TAGS);

  const [sendEmails, { loading: Emailsloading, error: Emailerror, data: emaildata }] =
    useMutation(SEND_EMAILS_MUTATION);
  const [updateLead] = useMutation(updateLeadMutation);

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [gridDataLoading, setGridDataLoading] = useState(true);

  const handleUpdate = async (values, id, type) => {
    const entries = values?.map((x) => x.title);
    if (type === 'categories') {
      await updateLead({
        variables: {
          id,
          categoriesList: entries,
        },
      });
    }
    if (type === 'tags') {
      await updateLead({
        variables: {
          id,
          tagsList: entries,
        },
      });
    }
  };

  const handleCellEditStart = (params) => {
    console.log('Cell edit started:', params);
    // alert(`Cell edit started: row ${params.id}, field ${params.field}`);
  };

  const handleCellEditCommit = (params, getRow) => {
    console.log('Cell edit commited:', params);
  };

  const rows = [];

  const handleSendEmails = async (Emails, Subject, Body) => {
    try {
      const { data } = await sendEmails({
        variables: {
          emails: Emails,
          subject: Subject,
          body: Body,
        },
      });
      console.log(data); // do something with the returned data
    } catch (e) {
      console.error(e); // handle errors
    }
  };

  const apiRef = React.useRef(null);

  const handleRowSelection = (params) => {
    const selectedEmails = params.map((id) => {
      const row = responseData.find((r) => r.id === id);
      return row.email;
    });
    setRowSelectedUsers(selectedEmails);
  };

  useEffect(() => {
    if (data?.leads) {
      // console.log(props.UserData)

      const usersWithIds = data.leads.map((user, index) => {
        const Tags = user.tags.map((item, index) => {
          return item.title;
        });

        const Categories = user.categories.map((item, index) => {
          return item.title;
        });

        const OGTags = user.tags.map((item, index) => {
          return item.id;
        });

        const OGCategories = user.categories.map((item, index) => {
          return item.id;
        });

        console.log(Categories);
        console.log(Tags);

        // alert("user!")

        return { ...user, Uid: index, tags: Tags, categories: Categories, ogTags: OGTags, ogCategories: OGCategories };
      });

      setResponseData(usersWithIds);
    }
  }, [props.UserData, data]);

  const columns = useMemo(
    () => [
      {
        field: 'Profile',
        headerName: 'Profile',
        width: 150,
        editable: true,
        renderCell: (params) => (
          <Button variant="outlined" onClick={() => console.log('params', params.row)}>
            Profile
          </Button>
        ),

        hide: true,
      },
      {
        field: 'firstName',
        headerName: 'First Name',
        width: 180,
        editable: true,
        type: 'text',
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        width: 180,
        editable: true,

        hide: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 180,
        editable: true,

        hide: true,
      },
      {
        field: 'phoneStatus',
        headerName: 'Phone Status',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'emailInvalid',
        headerName: 'Email Invalid',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'GloballyOptedOutOfEmail',
        headerName: 'GloballyOptedOutOfEmail',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'GloballyOptedOutOfBuyerAgentEmail',
        headerName: 'GloballyOptedOutOfBuyerAgentEmail',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'GloballyOptedOutOfListingAgentEmail',
        headerName: 'GloballyOptedOutOfListingAgentEmail',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'GloballyOptedOutOfLenderEmail',
        headerName: 'GloballyOptedOutOfLenderEmail',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'GloballyOptedOutOfAlerts',
        headerName: 'GloballyOptedOutOfAlerts',
        width: 120,
        editable: true,
        hide: true,
      },
      {
        field: 'OptInDate',
        headerName: 'OptInDate',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'BuyerAgentCategory',
        headerName: 'BuyerAgentCategory',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'ListingAgentCategory',
        headerName: 'ListingAgentCategory',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'LenderCategory',
        headerName: 'LenderCategory',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'BuyerAgent',
        headerName: 'BuyerAgent',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'ListingAgent',
        headerName: 'ListingAgent',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'Lender',
        headerName: 'Lender',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'OriginalSource',
        headerName: 'OriginalSource',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'OriginalCampaign',
        headerName: 'OriginalCampaign',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'Last Agent Note',
        headerName: 'LastAgentNote',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'eAlerts',
        headerName: 'E Alerts',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'VisitTotal',
        headerName: 'Visit Total',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'listingviewcount',
        headerName: 'Listing View Count',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'AvgListingPrive',
        headerName: 'Avg. Listing Prive',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'NextCallDue',
        headerName: 'Next Call Due',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'LastAgentCalDate',
        headerName: 'LastAgentCalDate',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'LastLenderCallDate',
        headerName: 'LastLenderCallDate',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'FirstVisitDate',
        headerName: 'Firs tVisit Date',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'LastVisitDate',
        headerName: 'Last Visit Date',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'RegisterDate',
        headerName: 'RegisterDate',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'LeadType',
        headerName: 'LeadType',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'AgentSelected',
        headerName: 'AgentSelected',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'LenderOptIn',
        headerName: 'Lender OptIn',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'Address',
        headerName: 'Address',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'City',
        headerName: 'City',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'State',
        headerName: 'State',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'ZipCode',
        headerName: 'Lender',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'Link',
        headerName: 'Link',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'Birthday',
        headerName: 'Birthday',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'HomeClosingDate',
        headerName: 'HomeClosingDate',
        width: 120,
        editable: true,

        hide: true,
      },
      {
        field: 'tags',
        headerName: 'Tags',
        width: 310,
        editable: true,
        renderCell: (params) => (
          <SelectField
            data={params.row}
            list={tagData && tagData?.tags}
            defaultValues={params?.row?.tagsList?.map((x) => ({
              title: x,
            }))}
            type={'tags'}
            handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
          />
        ),
      },
      {
        field: 'categories',
        headerName: 'Categories',
        width: 330,
        editable: true,
        renderCell: (params) => (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderTop: 'none',
              borderBottom: 'none',
              borderLeft: '1px solid lightgray',
              borderRight: '1px solid black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SelectField
              data={params.row}
              list={categoriesData && categoriesData?.categories}
              defaultValues={params?.row?.categoriesList?.map((x) => ({
                title: x,
              }))}
              type={'categories'}
              handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
            />
            {/* <CategoryBoxView defaultValues={params.row.categories} Lead={params.row} /> */}
          </Box>
        ),
      },
      //   { field: 'Uid', headerName: 'UID', width: 100, editable: true, hide: true },
    ],
    [rowId, data]
  );

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleEditRowsModelChange = (params) => {
    const updatedData = [...responseData];
    params.forEach((cell) => {
      const { field, id, value } = cell;
      const row = updatedData.find((r) => r.id === id);
      row[field] = value;
    });

    setResponseData(updatedData);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  useEffect(() => {
    const filteredRows = responseData.filter((row) => {
      const matched = Object.values(row).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });

      const categoryMatched =
        categories.length === 0 ||
        categories.some((category) => {
          return row.categories.includes(category);
        });

      return matched && categoryMatched;
    });

    setFilteredData(filteredRows);
  }, [responseData, searchQuery, categories]);

  // ...

  <DataGridPro
    rows={filteredData}
    // ...
  />;

  // const handleVisibility=()=>{
  //  const a= columns.filter((column) => selectedColumns.includes(column.field))
  //  console.log('a-------------------', a);
  // }

  // remove categories and tags from data.leads and make new array
  const leadsRows = data?.leads
    ? data.leads.map((lead) => {
        const { __typename, ...rest } = lead;
        return { ...rest, profile: 'hello' };
      })
    : [];

  // get columns where hide is false
  const visible = [];
  columns.forEach((column) => {
    visible.push(column.field);
  });
  console.log('visinle--col-----------------', visible);
  const leadsCols = leadsRows[0] ? Object.keys(leadsRows[0]) : [];
  console.log('visinle----row---------------', leadsCols);

  // go over columns and get colums that does not have hide:true
  const visibleColumns = [];
  columns.forEach((column) => {
    if (!column.hide) {
      visibleColumns.push(column.field);
    }
  });
  console.log('visibleColumns-----------------', visibleColumns);

  // when page loads, check if columns are in local storage, if not, set them
  useEffect(() => {
    if (localStorage.getItem('columns')) {
      const visibleColumnsFieldList = JSON.parse(localStorage.getItem('columns'));
      console.log('columns list in localstorage-----------------', visibleColumnsFieldList);

      if (visibleColumnsFieldList.length > 0) {
        columns.forEach((column) => {
          if (visibleColumnsFieldList.includes(column.field)) {
            column.hide = false;
          } else {
            column.hide = true;
          }
        });
        // make object with column.field as key and column.hide as value
      }
    }
    const columnsToShow = {};
    columns.forEach((column) => {
      columnsToShow[column.field] = column.hide;
    });
    setColumnsToShow(columns);
    setGridDataLoading(false);
  }, []);
  console.log('columnsToShiw-----------------', columnsToShow);

  const ColumnVisibilityChangeHandler = (obj) => {
    const visibleColumnsFieldList = Object.keys(obj).filter((key) => obj[key]);
    console.log('columnbeforeslect----------------', visibleColumnsFieldList);
    localStorage.setItem('columns', JSON.stringify(visibleColumnsFieldList));
  };
  return (
    <div style={{ height: 600, width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '40px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <AddLeadModal handleRefetch={refetch} />

          {/* // TODO PUT BACK */}
          <AddCSVLeadModal />
          <AddTagModal callback={() => setRefetchTag(new Date().getTime())} />
          <AddCategoryModal callback={() => setRefetchCategories(new Date().getTime())} />
        </Box>

        <Box flex>
          <Button variant="outlined" style={{ marginRight: 16 }}>
            Export
          </Button>
          <Button
            variant="outlined"
            disabled={rowSelectedUsers.length === 0}
            onClick={() => handleSendEmails(rowSelectedUsers, 'Test Subject', 'This is a test email body')}
          >
            Send Email
          </Button>
        </Box>
      </div>

      <div style={{ height: 540, width: '100%' }}>
        {/* DATA GRID PRO  */}
        <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            Updated Lead!
          </Alert>
        </Snackbar>
        <Box sx={{ position: 'relative', top: '30px', overflowX: 'scroll', width: '100%' }}>
          <CategoryGrid remote={(e) => setCategories(e)} callback={refetchCategories} />
        </Box>
        <Box sx={{ height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'relative',
              top: '60px',
              right: '16px',
              zIndex: '2',
              maxWidth: '330px',
              marginLeft: 'auto',
            }}
          >
            <Typography variant="h6" style={{ marginRight: 16 }}>
              User Fields
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </Box>

          {/* <DataGridPro
            sx={gridStyles}
            rows={leads}
            columns={columns.filter((column) => selectedColumns.includes(column.field))}
            pageSize={pageSize}
            disableVirtualization
            rowHeight={70}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            apiRef={apiRef}
            onSelectionModelChange={handleRowSelection}
            onPageSizeChange={handlePageSizeChange}
            // onCellEditCommit={(params) => setRowId(params.id)}
            onCellEditCommit={handleCellEditCommit} // Add this line
            onCellEditStart={handleCellEditStart} // Add this line
            components={{ Toolbar: GridToolbar }}
            // onColumnVisibilityModelChange={handleVisibility}
            componentsProps={{
              toolbar: {
                selectedColumns,
                setSelectedColumns,
                gridRef,
                setGridRef,
              },
            }}
          /> */}
          {console.log('columnsToShowbeforepassing-----------------', columnsToShow)}
          {!gridDataLoading && (
            <DataGridPro
              sx={gridStyles}
              rows={leadsRows}
              columns={columnsToShow}
              onColumnVisibilityModelChange={(e) => ColumnVisibilityChangeHandler(e)}
              editable
              editMode="cell"
              apiRef={apiRef}
              disableColumnMenu
              onCellEditCommit={(params, event) => {
                console.log('cell edit commit', params);
              }}
              components={{
                Toolbar: GridToolbar,
                gridRef,
              }}
            />
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              position: 'relative',
              bottom: '55px',
              marginLeft: '20px',
            }}
          >
            <Typography variant="h6" sx={{ marginRight: '20px' }}>
              Rows per page:
            </Typography>
            <TextField
              size="small"
              select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              variant="outlined"
              style={{ width: 80 }}
            >
              {[5, 10, 25].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleCloseSnackbar}>
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: '90vw', backgroundColor: 'green', color: 'white' }}
            >
              Updated Lead!
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </div>
  );
}
