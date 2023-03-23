
import { useEffect } from "react"
import {Box, Typography} from '@mui/material'
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GET_LEADS } from "../../queries/leadQueries";

export default function Users() {

  const { loading, error, data} = useQuery(GET_PROJECTS);


    const rows = [

        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    
    ];
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'firstName', headerName: 'First name', width: 130},
        {field: 'lastName', headerName: 'Last name', width: 130},
    ]


  //  if (loading) return <Spinner/>
  //   if(error) return <p>Something went wrong</p>

  return (
    <Box sx={{height: 400, width: '100%'}}>


        <Typography
         variant="h3" 
        component='h3'
        sx={{textAlign: 'center', mt:3 , mb: 3}} > 
        Manage Users
        </Typography>

        <DataGridPro columns={columns} rows={data}/>

    </Box>
  )
}
