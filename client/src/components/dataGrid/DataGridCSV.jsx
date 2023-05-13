import * as React from 'react';
import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import UsersActions from '../UsersActions';
import { GET_CLIENTS } from '../../queries/clientQueres';
import UserModal from '../modals/UserModal';
import styles from './Datagrid.module.css';

export default function DataGridCSV(props) {
  const [ResponseData, setResponseData] = useState(null);
  const rows = [
    // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  React.useEffect(() => {
    if (props.UserData) {
      const usersWithIds = props.UserData.map((user, index) => {
        return { ...user, id: index + 1 };
      });
      setResponseData(usersWithIds);
    } else {
      setResponseData(rows);
    }
  }, [props.UserData, rows]);

  const [pageSize, setpageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(() => {
    // Get all the fields that exist in the first object of the data array
    const dataFields = ResponseData && ResponseData.length > 0 ? Object.keys(ResponseData[0]) : [];

    // Filter the columns array based on the fields that exist in the data array
    return [
      { field: 'ContactID', headerName: 'ID', width: 120, editable: true },
      { field: 'firstName', headerName: 'First Name', width: 120, editable: true },
      { field: 'lastName', headerName: 'Last Name', width: 120, editable: true },
      { field: 'email', headerName: 'Emails', width: 170, editable: true },
      { field: 'phone', headerName: 'Phones', width: 120, editable: true },
      { field: 'phoneStatus', headerName: 'PhoneStatus', width: 120, editable: true },
      { field: 'emailInvalid', headerName: 'EmailInvalid', width: 100, editable: true },
      { field: 'GloballyOptedOutOfEmail', headerName: 'GloballyOptedOutOfEmail', width: 220, editable: true },
      { field: 'GloballyOptedOutOfBuyerAgentEmail', headerName: 'OptedOutOfBuyerAgentEmail', width: 220, editable: true },
      { field: 'GloballyOptedOutOfListingAgentEmail', headerName: 'OptedOutOfListingAgentEmail', width: 220, editable: true },
      { field: 'GloballyOptedOutOfLenderEmail', headerName: 'OptedOutOfLenderEmail', width: 220, editable: true },
      { field: 'GloballyOptedOutOfAlerts', headerName: 'OptedOutOfeAlerts', width: 220, editable: true },
      { field: 'OptInDate', headerName: 'OptInDate', width: 150, editable: true },
      { field: 'BuyerAgentCategory', headerName: 'BuyerAgentCategory', width: 220, editable: true },
      { field: 'ListingAgentCategory', headerName: 'ListingAgentCategory', width: 220, editable: true },
      { field: 'LenderCategory', headerName: 'LenderCategory', width: 120, editable: true },
      { field: 'BuyerAgent', headerName: 'BuyerAgent', width: 120, editable: true },
      { field: 'Notes', headerName: 'Notes', width: 150, editable: true },
      { field: 'ListingAgent', headerName: 'Listing Agent', width: 120, editable: true },
      { field: 'Lender', headerName: 'Lender', width: 120, editable: true },
      { field: 'OriginalSource', headerName: 'OriginalSource', width: 120, editable: true },
      { field: 'OriginalCampaign', headerName: 'OriginalCampaign', width: 120, editable: true },
      { field: 'LastAgentNote', headerName: 'LastAgentNote', width: 120, editable: true },
      { field: 'eAlerts', headerName: 'eAlerts', width: 120, editable: true },
      { field: 'VisitTotal', headerName: 'VisitTotal', width: 120, editable: true },
      { field: 'listingviewcount', headerName: 'listingviewcount', width: 120, editable: true },
      { field: 'AvgListingPrice', headerName: 'AvgListingPrice', width: 150, editable: true },
      { field: 'NextCallDue', headerName: 'NextCallDue', width: 120, editable: true },
      { field: 'LastAgentCallDate', headerName: 'LastAgentCallDate', width: 150, editable: true },
      { field: 'LastLenderCallDate', headerName: 'LastLenderCallDate', width: 150, editable: true },
      { field: 'FirstVisitDate', headerName: 'FirstVisitDate', width: 150, editable: true },
      { field: 'LastVisitDate', headerName: 'LastVisitDate', width: 150, editable: true },
      { field: 'RegisterDate', headerName: 'RegisterDate', width: 150, editable: true },
      { field: 'LeadType', headerName: 'LeadType', width: 120, editable: true },
      { field: 'AgentSelected', headerName: 'AgentSelected', width: 120, editable: true },
      { field: 'LenderOptIn', headerName: 'LenderOptIn', width: 120, editable: true },
      { field: 'Address', headerName: 'Address', width: 120, editable: true },
      { field: 'City', headerName: 'City', width: 120, editable: true },
      { field: 'State', headerName: 'State', width: 120, editable: true },
      { field: 'ZipCode', headerName: 'ZipCode', width: 120, editable: true },
      { field: 'Tags', headerName: 'Tags', width: 220, editable: true },
      { field: 'Link', headerName: 'Link', width: 250, editable: true },
      { field: 'Birthday', headerName: 'Birthday', width: 150, editable: true },
      { field: 'HomeClosingDate', headerName: 'HomeClosingDate', width: 150, editable: true },
      
      // { field: 'DateCreated', headerName: 'Date Created', width: 150, editable: true },
      // { field: 'QueryString', headerName: 'Query String', width: 150, editable: true },
      // { field: 'UserID', headerName: 'User ID', width: 150, editable: true },
      // { field: 'AssociatedOpportunityID', headerName: 'Associated Opportunity ID', width: 150, editable: true },
      // { field: 'CallDetails', headerName: 'Call etails', width: 250, editable: true },
      // { field: 'ContactPhoneID', headerName: 'Contact PhoneI D', width: 150, editable: true },
      // { field: 'LogType', headerName: 'Log Type', width: 150, editable: true },

      {
        field: 'Actions',
        headerName: 'actions',
        width: 130,
        renderCell: (params) => <UsersActions {...{ params, rowId, setRowId }} />,
      },
    ].filter((col) => dataFields.includes(col.field));
  }, [ResponseData]);

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      {ResponseData ? (
        <DataGridPro
          columns={columns}
          rows={ResponseData}
          rowHeight={50}
          onCellEditCommit={(params) => setRowId(params.id)}
          checkboxSelection
          disableSelectionOnClick
        />
      ) : (
        <div>No Data</div>
      )}
    </Box>
  );
}

// import * as React from 'react';

// import { useQuery } from '@apollo/client';
// import { useMemo,useState} from 'react';
// import Box from '@mui/material/Box';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import moment from 'moment';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import UsersActions from '../UsersActions';
// import styles from './Datagrid.module.css';

// import { GET_CLIENTS } from '../../queries/clientQueres';
// import UserModal from '../modals/UserModal';

// export default function DataGridCSV(props) {

//   const [count, setCount] = useState(0);

//   const [ChartData,setData] = useState(props.data)
//   const { loading, error, graphQLClients} = useQuery(GET_CLIENTS)
//   const [ResponseData, setResponseData] = useState(null);
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100000,
//     editable: true,
//   });

//   const rows = [
//     // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];

//   React.useEffect(() => {

//     if(props.UserData){

//       const usersWithIds = props.UserData.map((user, index) => {
//         return { ...user, id: index + 1 };
//       });
//       setResponseData(usersWithIds)

//   }

//       else{
//         setResponseData(rows)
//       }

//   }, [props.UserData, rows])

//     const [pageSize , setpageSize] = useState(5);
//     const [rowId, setRowId ]= useState(null)

//       //   const columns = useMemo(
//       //     () => [

//       //       {field: 'ContactID', headerName: 'ID', width: 120,  editable: true},
//       //       {field: 'FirstName', headerName: 'First Name', width: 120,  editable: true},
//       //       {field: 'LastName', headerName: 'Last Name', width: 120,  editable: true},
//       //       {field: 'Notes', headerName: 'Notes', width: 150,  editable: true},
//       //       {field: 'BuyerAgent', headerName: 'Buyer Agent', width: 120,  editable: true},
//       //       {field: 'ListingAgent', headerName: 'Listing Agent', width: 120,  editable: true},
//       //       {field: 'QueryString', headerName: 'Query String', width: 150,  editable: true},
//       //       {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  <UsersActions{...{params, rowId, setRowId}}/>},

//       //  ], [rowId])

//       const columns = useMemo(() => {
//         // Get all the fields that exist in the first object of the data array
//         const dataFields = ResponseData && ResponseData.length > 0 ? Object.keys(ResponseData[0]) : [];

//         // Filter the columns array based on the fields that exist in the data array
//         return columns.filter((col) => {
//           return ResponseData ? Object.keys(ResponseData[0]).includes(col.field) : false;
//         });

//       }, [columns, ResponseData]);

//   return (
//     <Box sx={{ height: 520, width: '100%' }}>

//       {ResponseData?(
//       <DataGridPro
//        columns={columns}
//         rows={ResponseData}

//         rowHeight={50}
//         onCellEditCommit={(params) => setRowId(params.id)}
//         checkboxSelection
//         disableSelectionOnClick

//       />): ( <div>No Data</div>)}

//     </Box>
//   );
// }

// // removed parameter from data grid:
// // experimentalFeatures={{ newEditingApi: true }}
