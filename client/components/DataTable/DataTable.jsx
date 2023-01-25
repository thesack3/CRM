import { DataGridPro } from '@mui/x-data-grid-pro';
import styles from './DataTable.module.css'


export default function DataTable() {

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

  return (
    <DataGridPro className={styles.table} rows={rows} columns={columns}/>
  )
}
