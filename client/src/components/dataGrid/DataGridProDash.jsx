

import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem , TextField, Typography, Drawer  } from '@mui/material';
import { useQuery ,useMutation} from '@apollo/client';
import { useMemo,useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import moment from 'moment';
import { useDemoData } from '@mui/x-data-grid-generator';
import UsersActions from '../UsersActions';
import styles from './Datagrid.module.css';
import CellBox from '../CellBox';
import { GET_CLIENTS } from '../../queries/clientQueres';
import { GET_LEADS } from '../../queries/leadQueries';
import ProfileDetailsPage from '../ProfileDetailsPage';
import { updateLeadMutation } from '../../mutations/leadMutations';
import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';
import EmailActionModal from '../modals/EmalActionModal';
import AddNote from '../modals/AddNote';
import AddeAlert from '../modals/AddeAlert';
import ProfileP from '../Profile/ProfileP';



export default function DataGridProCSV(props) {







  const [updateLead, { Leadloading, error, Leaddata }] = useMutation(updateLeadMutation);


  const handleUpdateLead = async (leadId, first, Email, last, Tags) => {
      try {
       const result = await updateLead({
          variables: {
            id: leadId,
            firstName: first,
            email: Email,
            lastName: last,
            tags: Tags
          }
        }).then((res) => {

          console.log("Lead Updated");
        // console.log(result.data.updateLead);
          console.log(res)
        }).catch((err) => {
          console.log("error updating lead.");
      console.log(err)
          console.log(err)
        });

  
        return result
      // return result.data.updateLead;
      } catch (error) {
        console.log("Failed updating the lead");
        console.log(error);
        return null;
      }
    };
    
  const [selectedColumns, setSelectedColumns] = useState([
    'id',
    'firstName',
    'email',
    'lastName',
    'Profile',
  ]);
  const [gridRef, setGridRef] = useState({});
  const [count, setCount] = useState(0);
  const [sendEmails, { loading: Emailsloading, error: Emailerror, data: emaildata }] = useMutation(
    SEND_EMAILS_MUTATION
  );
  const [rowSelectedUsers, setRowSelectedUsers] = useState([
    'dominiqmartinez13@gmail.com',
    'unhashlabs@gmail.com',
  ]);
  const [responseData, setResponseData] = useState([]);

  const { loading: graphQLClientsLoading, error: graphQLClientsError, data } = useQuery(GET_LEADS);
  
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');



  const handleCellEditStart = (params) => {
    console.log('Cell edit started:', params);
   // alert(`Cell edit started: row ${params.id}, field ${params.field}`);
  };


  const handleCellEditCommit = (params, getRow) => {
  console.log('Cell edit commited:', params);
  };
  
  

  
  const rows = [
   
  ];

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
    if(props.UserData){ 
      // console.log(props.UserData)
      
 
    const usersWithIds = props.UserData.map((user, index) => {
      return { ...user, Uid: index};
    });


    setResponseData(usersWithIds)

}
  }, [ props.UserData , data]);


  const columns = useMemo(
    () => [
      {field: 'Profile', headerName: 'Profile', width: 150,  editable: true, renderCell: (params) =>  <ProfileDetailsPage row={params.row.Uid} {...{params }}/>},
      { field: 'id', headerName: 'ID', width: 250, editable: true},
      { field: 'firstName', headerName: 'First Name', width: 180, editable: true, type: 'text'  , renderCell: (params) =>  <CellBox item={1} {...{params, rowId, setRowId }}/>},
      { field: 'lastName', headerName: 'last Name', width: 180, editable: true , renderCell: (params) =>  <CellBox item={2} {...{params, rowId, setRowId }}/>},
      { field: 'email', headerName: 'email', width: 250, editable: true, renderCell: (params) =>  <CellBox item={3} {...{params, rowId, setRowId }}/> },
      { field: 'phone', headerName: 'phone', width: 180, editable: true },
      { field: 'phoneStatus', headerName: 'phoneStatus', width: 120, editable: true },
      { field: 'emailInvalid', headerName: 'emailInvalid', width: 120, editable: true },
      { field: 'GloballyOptedOutOfEmail', headerName: 'GloballyOptedOutOfEmail', width: 120, editable: true },
      { field: 'GloballyOptedOutOfBuyerAgentEmail', headerName: 'GloballyOptedOutOfBuyerAgentEmail', width: 120, editable: true },
      { field: 'Uid', headerName: 'UID', width: 100, editable: true },
      ],
      [rowId]
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
      
      const filteredData = useMemo(() => {
      if (!searchQuery) {
      return responseData;
      }
      const filteredRows = responseData.filter((row) => {
      return Object.values(row).some((fieldValue) => {
      return String(fieldValue).toLowerCase().includes(searchQuery.toLowerCase());
      });
      });
      return filteredRows;
    }, [responseData, searchQuery]);

    return (
    <div style={{ height: 600, width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" style={{ marginRight: 16 }}>
    User Data
    </Typography>
    <TextField
    variant="outlined"
    label="Search"
    value={searchQuery}
    onChange={handleSearchInputChange}
    style={{ marginRight: 16 }}
    />
    <Button variant="outlined" style={{ marginRight: 16 }}>
    Export
    </Button>
    <Button
    variant="outlined"
    style={{ marginRight: 16 }}
    disabled={rowSelectedUsers.length === 0}
    onClick={() =>
    handleSendEmails(rowSelectedUsers, 'Test Subject', 'This is a test email body')
    }
    >
    Send Email
    </Button>
    <Typography variant="h6" style={{ marginLeft: 'auto', marginRight: 16 }}>
    Rows per page:
    </Typography>
    <TextField
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
    </div>
    <div style={{ height: 540, width: '100%' }}>

    <DataGridPro
  rows={filteredData}
  columns={columns.filter((column) => selectedColumns.includes(column.field))}
  pageSize={pageSize}
  rowsPerPageOptions={[5, 10, 25]}
  checkboxSelection
  disableSelectionOnClick
    apiRef={apiRef}
  onSelectionModelChange={handleRowSelection}
  onPageSizeChange={handlePageSizeChange}
  // onCellEditCommit={(params) => setRowId(params.id)}
  onCellEditCommit={handleCellEditCommit} // Add this line
  onCellEditStart={handleCellEditStart} // Add this line
  components={{ Toolbar: GridToolbar }}
  componentsProps={{
    toolbar: {
      selectedColumns,
      setSelectedColumns,
      gridRef,
      setGridRef,
      count,
      setCount,
    },
  }}
/>


    {/* <DataGridPro
    rows={filteredData}
    columns={columns.filter((column) => selectedColumns.includes(column.field))}
    pageSize={pageSize}
    rowsPerPageOptions={[5, 10, 25]}
    checkboxSelection
    disableSelectionOnClick
    onSelectionModelChange={handleRowSelection}
    onPageSizeChange={handlePageSizeChange}
    // onEditRowsModelChange={handleEditRowsModelChange}
  
 onCellEditCommit={(params) => setRowId(params.id)}
    components={{ Toolbar: GridToolbar }}
    componentsProps={{
    toolbar: {
    selectedColumns,
    setSelectedColumns,
    gridRef,
    setGridRef,
    count,
    setCount,
    },
    }}
    /> */}
    </div>

    </div>
    );
    }



// removed parameter from data grid:
// experimentalFeatures={{ newEditingApi: true }}



