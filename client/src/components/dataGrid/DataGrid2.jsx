// TODO: add subscription to update the table when a new lead is added, NEW_LEAD_SUBSCRIPTION
import * as React from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { GET_LEADS } from '../../queries/leadQueries';
import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';
import AddLeadModal from '../modals/AddLead';
import AddCSVLeadModal from '../modals/AddCSVLeadModal';
import AddTagModal from '../modals/AddTag';
import AddCategoryModal from '../modals/AddCategory';
import CategoryGrid from '../inputs/CategorySearchBox';
import { gridStyles } from '../../constants/styles';
import SelectField from '../SelectField';
import { updateLeadMutation } from '../../mutations/leadMutations';
import CustomModal from '../modals/CustomModal';
import LeadDetails from '../LeadDetails';
import { callContext } from '../../hooks/useCall';
import SelectTag from '../SelectTag';
import AddNote from '../modals/AddNote';
import AddCSVCall from '../modals/AddCSVCalls';
import AddeAlert from '../modals/AddeAlert';
import { setAlert } from '../../redux/slice/alertSlice';

export default function DataGridProCSV2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLeadId } = React.useContext(callContext);
  const [sortModel, setSortModel] = useState([{ field: 'name', sort: 'asc' }]);
  const [sort, setSort] = useState('');
  const [column, setColumn] = useState('');
  const [profileModal] = useState(false);
  const [refetchCategories, setRefetchCategories] = useState('');
  const [, setRefetchTag] = useState('');
  const [categories, setCategories] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const [gridRef] = useState({});
  const [openSnack, setOpenSnack] = React.useState(false);
  const [rowSelectedUsers] = useState(['dominiqmartinez13@gmail.com', 'unhashlabs@gmail.com']);
  const [take, setTake] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const [openLeadDetails, setOpenLeadDetails] = useState(false);
  const [currentParam, setCurrentParam] = useState(null);
  const [filter, setFilter] = useState('');
  const [filterModel, setFilterModel] = useState({});
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [skip, setSkip] = React.useState(0);

  const {
    loading: graphQLClientsLoading,
    data,
    refetch,
  } = useQuery(GET_LEADS, {
    variables: {
      skip,
      take: pageSize,
      filter,
      category: categories,
      column,
      sort,
      filterModel: JSON.stringify(filterModel),
    },
  });
  // const { data: allLeads, refetch: allLeadsRefetch } = useQuery(GET_LEADS);

  const [sendEmails] = useMutation(SEND_EMAILS_MUTATION);
  const [updateLead] = useMutation(updateLeadMutation);

  const [rowId] = useState(null);
  const [, setGridDataLoading] = useState(true);

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
    refetch();
  };

  // const handleCellEditStart = (params) => {
  //   console.log('Cell edit started:', params);
  //   // alert(`Cell edit started: row ${params.id}, field ${params.field}`);
  // };

  // const handleCellEditCommit = (params, getRow) => {
  //   console.log('Cell edit commited:', params);
  // };

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

  const columns = useMemo(
    () => [
      {
        field: 'Profile',
        headerName: 'Profile',
        width: 150,
        editable: true,
        renderCell: (params) => {
          return (
            <Button
              variant="outlined"
              onClick={() => {
                setLeadId(params?.row?.id);
                navigate(`/dashboard/lead/${params?.row?.id}`);
                // setOpenLeadDetails(true);
                // setCurrentParam(params.row);
              }}
            >
              Profile
            </Button>
          );
        },
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
        field: 'description',
        headerName: 'Description',
        width: 180,
        editable: true,
        type: 'text',
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
          <SelectTag
            data={params.row}
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

  // const handleEditRowsModelChange = (params) => {
  //   const updatedData = [...responseData];
  //   params.forEach((cell) => {
  //     const { field, id, value } = cell;
  //     const row = updatedData.find((r) => r.id === id);
  //     row[field] = value;
  //   });

  //   setResponseData(updatedData);
  // };

  const [filteredData, setFilteredData] = useState([]);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  // useEffect(() => {
  //   const filteredRows = responseData.filter((row) => {
  //     const matched = Object.values(row).some((value) => {
  //       return String(value).toLowerCase().includes(searchQuery.toLowerCase());
  //     });

  //     const categoryMatched =
  //       categories.length === 0 ||
  //       categories.some((category) => {
  //         return row.categories.includes(category);
  //       });

  //     return matched && categoryMatched;
  //   });

  //   setFilteredData(filteredRows);
  // }, [responseData, searchQuery, categories]);

  // ...

  // const handleVisibility=()=>{
  //  const a= columns.filter((column) => selectedColumns.includes(column.field))
  //  console.log('a-------------------', a);
  // }

  // remove categories and tags from data.leads and make new array
  const leadsRows = data?.leads?.rows
    ? data.leads.rows.map((lead) => {
        const { __typename, ...rest } = lead;
        return { ...rest, profile: 'hello' };
      })
    : [];

  // get columns where hide is false
  const visible = [];
  columns.forEach((column) => {
    visible.push(column.field);
  });
  const leadsCols = leadsRows[0] ? Object.keys(leadsRows[0]) : [];

  // go over columns and get colums that does not have hide:true
  const visibleColumns = [];
  columns.forEach((column) => {
    if (!column.hide) {
      visibleColumns.push(column.field);
    }
  });

  // when page loads, check if columns are in local storage, if not, set them
  useEffect(() => {
    console.log('useEffectisrunning');
    if (localStorage.getItem('columns')) {
      const visibleColumnsFieldList = JSON.parse(localStorage.getItem('columns'));
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
    console.log('setColumnsas', columns);
    setColumnsToShow(columns);
    setGridDataLoading(false);
  }, []);

  const ColumnVisibilityChangeHandler = (obj) => {
    const visibleColumnsFieldList = Object.keys(obj).filter((key) => obj[key]);
    localStorage.setItem('columns', JSON.stringify(visibleColumnsFieldList));
    console.log('visibleColumnsFieldList', obj);
    // visibleColumnsFieldList is an object containing column.field as key and column.hide as value
    // go over columnstoShow and set hide property to true or false according to visibleColumnsFieldList

    const columnsUpdated = columnsToShow.map((column) => {
      console.log('currentCol', column.field);
      if (obj[column.field]) {
        column.hide = false;
      } else {
        column.hide = true;
      }
      return column;
    });
    setColumnsToShow(columnsUpdated);

    // read hide property from columnsToShow and set it to respective column
    // const columnsToShow = columns.map((column) => {
    //   if (visibleColumnsFieldList[column.field]) {
    //     column.hide = false;
    //   } else {
    //     column.hide = true;
    //   }
    //   return column;
    // });
    // setColumnsToShow(columnsToShow);
  };

  const updateLeadField = async (values) => {
    try {
      if (values?.field) {
        const { value, field, id } = values;
        const response = await updateLead({
          variables: {
            id,
            [field]: value,
          },
        });
        if (response) {
          dispatch(setAlert({ type: 'success', message: 'Lead updated successfully' }));
        }
      }
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: error.message }));
    }
  };

  const handleRefetch = async () => {
    await refetch();
  };

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchQuery(input);
    if (!input) {
      setFilter('');
      setTake('10');
      setFilterModel({});
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      setFilter(searchQuery);
      setCategories([]);
    }
  };

  // fiter mui data grid pro with db
  function handleFilterModelChange(newFilterModel) {
    setSort('');
    if (
      !newFilterModel.items[0].value &&
      newFilterModel.items[0].operatorValue !== 'isEmpty' &&
      newFilterModel.items[0].operatorValue !== 'isNotEmpty'
    )
      return;
    setFilterModel(newFilterModel.items[0]);
  }

  // sorting
  function handleSortModelChange(newSortModel) {
    if (!newSortModel.length) return;
    setSort(newSortModel[0].sort);
    setColumn(newSortModel[0].field);
    setSortModel(newSortModel);
    setFilterModel({});
    setSkip(0);
    setPage(0);
    setPageSize(10);
  }

  const handlePageChange = (newPage) => {
    setSkip(newPage * pageSize);
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div style={{ height: 700, width: '100%' }}>
      {currentParam && (
        <LeadDetails
          leadDetail={currentParam}
          handleUpdate={(value, id, type) => handleUpdate(value, id, type)}
          openModal={openLeadDetails}
          setOpenModal={setOpenLeadDetails}
        />
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '40px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <AddLeadModal handleRefetch={handleRefetch} />
          {/* {profileModal && <ProfileP />} */}
          {profileModal && <CustomModal />}
          {/* // TODO PUT BACK */}
          <AddCSVLeadModal callback={handleRefetch} />
          <AddTagModal callback={() => setRefetchTag(new Date().getTime())} />
          <AddCategoryModal callback={() => setRefetchCategories(new Date().getTime())} />
          <AddNote callback={handleRefetch} />
          <AddCSVCall callback={handleRefetch} />
          <AddeAlert callback={handleRefetch} />
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
      <div style={{ height: 690, width: '100%' }}>
        <Box sx={{ marginTop: '16px' }}>
          <CategoryGrid remote={(e) => setCategories(e)} callback={refetchCategories} />
        </Box>
        <Box sx={{ height: '100%' }}>
          <Box
            sx={{
              marginBottom: '16px',
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
              type={'search'}
              label="Search"
              value={searchQuery}
              onKeyPress={handleKeyPress}
              onChange={(e) => handleSearchInputChange(e)}
            />
          </Box>

          {!graphQLClientsLoading ? (
            <DataGridPro
              sx={gridStyles}
              rows={categories.length || searchQuery ? data?.leads?.rows : leadsRows}
              columns={columnsToShow}
              onColumnVisibilityModelChange={(e) => ColumnVisibilityChangeHandler(e)}
              editable
              editMode="cell"
              apiRef={apiRef}
              disableColumnMenu
              // filterModel={filterModel}
              onFilterModelChange={(value) => handleFilterModelChange(value)}
              sortModel={sortModel}
              onSortModelChange={(e) => handleSortModelChange(e)}
              key={Math.random().toString()}
              onCellEditCommit={(params, event) => {
                updateLeadField(params);
              }}
              components={{ Toolbar: GridToolbar, gridRef }}
              componentsProps={{
                filterPanel: {
                  disableAddFilterButton: true,
                },
              }}
              rowsPerPageOptions={[10, 25, 50, 100, 200]}
              pagination="true" // enable pagination
              pageSize={pageSize} // set the page size to 10
              page={page} // set the initial page to 1
              rowCount={data?.leads?.count} // set the total number of rows to the length of the rows array
              paginationMode="server" // paginate on the client-side
              onPageChange={(value) => handlePageChange(value)} // handle page changes
              onPageSizeChange={(value) => handlePageSizeChange(value)} // handle page size changes
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
}
