import * as React from 'react';

import { useQuery } from '@apollo/client';
import { useMemo,useState} from 'react';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import moment from 'moment';
import { useDemoData } from '@mui/x-data-grid-generator';
import UsersActions from '../UsersActions';
import styles from './Datagrid.module.css';

import { GET_CLIENTS } from '../../queries/clientQueres';


export default function DataGridProCSV(props) {

  const [count, setCount] = useState(0);
  
  const [ChartData,setData] = useState(props.data)
  const { loading, error, graphQLClients} = useQuery(GET_CLIENTS)
  const [ResponseData, setResponseData] = useState(null);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
    editable: true,
  });

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

    if(props.UserData){ 
        // console.log(props.UserData)
   
      const usersWithIds = props.UserData.map((user, index) => {
        return { ...user, id: index + 1 };
      });
      setResponseData(usersWithIds)

  }


      else{
        setResponseData(rows)
      }
   
   
    
  }, [props.UserData, rows])

  


    const [pageSize , setpageSize] = useState(5);
    const [rowId, setRowId ]= useState(null)

 
        const columns = useMemo(
          () => [
            {field: 'id', headerName: 'ID', width: 70,  editable: true},
            {field: 'lastName', headerName: 'last Name', width: 70,  editable: true},
            {field: 'firstName', headerName: 'firstName', width: 70,  editable: true},
            {field: 'email', headerName: 'email', width: 70,  editable: true},
            {field: 'phone', headerName: 'phone', width: 70,  editable: true},
            {field: 'phoneStatus', headerName: 'phoneStatus', width: 70,  editable: true},
            {field: 'emailInvalid', headerName: 'emailInvalid', width: 70,  editable: true},
            {field: 'GloballyOptedOutOfEmail', headerName: 'GloballyOptedOutOfEmail', width: 70,  editable: true},
            {field: 'GloballyOptedOutOfBuyerAgentEmail', headerName: 'GloballyOptedOutOfBuyerAgentEmail', width: 70,  editable: true},
            {field: 'GloballyOptedOutOfLenderEmail', headerName: 'GloballyOptedOutOfLenderEmail', width: 70,  editable: true},
            {field: 'GloballyOptedOutOfAlerts', headerName: 'GloballyOptedOutOfAlerts', width: 70,  editable: true},
            {field: 'OptInDate', headerName: 'OptInDate', width: 70,  editable: true},
            {field: 'BuyerAgentCategory', headerName: 'BuyerAgentCategory', width: 70,  editable: true},
            {field: 'ListingAgentCategory', headerName: 'ListingAgentCategory', width: 70,  editable: true},
            {field: 'LenderCategory', headerName: 'LenderCategory', width: 70,  editable: true},
            {field: 'BuyerAgent', headerName: 'BuyerAgent', width: 70,  editable: true},
            {field: 'Lender', headerName: 'Lender', width: 70,  editable: true},

            {field: 'ListingAgent', headerName: 'ListingAgent', width: 70,  editable: true},
            {field: 'OriginalSource', headerName: 'OriginalSource', width: 70,  editable: true},
            {field: 'OriginalCampaign', headerName: 'OriginalCampaign', width: 70,  editable: true},
            {field: 'LastAgentNote', headerName: 'LastAgentNote', width: 70,  editable: true},
            {field: 'eAlerts', headerName: 'eAlerts', width: 70,  editable: true},
            {field: 'VisitTotal', headerName: 'VisitTotal', width: 70,  editable: true},
            {field: 'listingviewcount', headerName: 'listingviewcount', width: 70,  editable: true},
            {field: 'AvgListingPrice', headerName: 'AvgListingPrice', width: 70,  editable: true},
            {field: 'NextCallDue', headerName: 'NextCallDue', width: 70,  editable: true},
            {field: 'LastAgentCallDate', headerName: 'LastAgentCallDate', width: 70,  editable: true},
            {field: 'LastLenderCallDate', headerName: 'LastLenderCallDate', width: 70,  editable: true},
            {field: 'FirstVisitDate', headerName: 'FiFirstVisitDate', width: 70,  editable: true},
            {field: 'LastVisitDate', headerName: 'LastVisitDate', width: 70,  editable: true},
            {field: 'RegisterDate', headerName: 'RegisterDate', width: 70,  editable: true},
            {field: 'LeadType', headerName: 'LeadType', width: 70,  editable: true},
            {field: 'AgentSelected', headerName: 'Last AgentSelected', width: 70,  editable: true},
            {field: 'LenderOptIn', headerName: 'LenderOptIn', width: 70,  editable: true},
            {field: 'Address', headerName: 'Address', width: 70,  editable: true},
            {field: 'City', headerName: 'City', width: 70,  editable: true},
            {field: 'State', headerName: 'State', width: 70,  editable: true},
            {field: 'ZipCode', headerName: 'ZipCode', width: 70,  editable: true},
            {field: 'Tags', headerName: 'Tags', width: 70,  editable: true},
            {field: 'Link', headerName: 'Link', width: 70,  editable: true},
            {field: 'Birthday', headerName: 'Birthday', width: 70,  editable: true},
            {field: 'HomeClosingDate', headerName: 'Home Closing Date', width: 70,  editable: true},
            {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  <UsersActions{...{params, rowId, setRowId}}/>},
         
       ], [rowId])



  return (
    <Box sx={{ height: 520, width: '100%' }}>

      {ResponseData?(
      <DataGridPro
       columns={columns}
        rows={ResponseData}
        rowHeight={50}
        onCellEditCommit={(params) => setRowId(params.id)}
        checkboxSelection
        disableSelectionOnClick
        
      />): ( <div>No Data</div>)}
 
    </Box>
  );
}










// removed parameter from data grid:
// experimentalFeatures={{ newEditingApi: true }}



