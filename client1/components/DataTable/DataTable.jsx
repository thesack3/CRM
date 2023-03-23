
import { useEffect, useState, useMemo } from "react"
import { useQuery } from "@apollo/client";
import {Box, Typography} from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro';
import UsersActions from '../UsersActions'
import GET_LEADS from "@/queries/leadQueries";
import { GET_CLIENTS } from "@/queries/clientQueries";


export default function Users() {

  //const { loading, error, data} = useQuery(GET_LEADS);


  
  //Retrieve users from the database


  useEffect(() => {

    
    
  
    return () => {
      
    }
  }, [])
  

  const [pageSize , setpageSize] = useState(5);
  const [rowId, setRowId ]= useState(null)


 

    const rows = [

        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    
    ];
    // const columns = [
    //     {field: 'id', headerName: 'ID', width: 70},
    //     {field: 'firstName', headerName: 'First name', width: 130},
    //     {field: 'lastName', headerName: 'Last name', width: 130},
    //     {field: 'actions', headerName: 'Actions', width: 130, renderCell: (params) => <UsersActions{...{params, rowId, setRowId}}/>}
    // ]


    const columns = useMemo(
      () => [
      {field: 'id', headerName: 'ID', width: 70},
      {field: 'firstName', headerName: 'First name', width: 130},
      {field: 'lastName', headerName: 'Last name', width: 130},
      {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  {<UsersActions{...{params, rowId, setRowId}}/>}}
  ], [rowId])

  return (
   
    <Box sx={{height: 400, width: '100%'}}>


        <Typography
         variant="h3" 
        component='h3'
        sx={{textAlign: 'center', mt:3 , mb: 3}} > 
        Manage Users
        </Typography>

        <DataGridPro getRowId={ row => row.id} columns={columns} rows={rows} />

    </Box>
  )
}
