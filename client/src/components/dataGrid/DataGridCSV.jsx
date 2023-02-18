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




export default function DataGridCSV(props) {

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
            {field: 'LastName', headerName: 'Last Name', width: 70,  editable: true},
            {field: 'FirstName', headerName: 'First', width: 70,  editable: true},
            {field: 'Description', headerName: 'Last Name', width: 70,  editable: true},
            {field: 'Address', headerName: 'First', width: 70,  editable: true},
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



