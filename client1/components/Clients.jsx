
import { gql, useQuery } from "@apollo/client"
import styles from './Clients.module.css'
import ClientRow from './ClientRow'
import Spinner from './Spinner'
import{ GET_CLIENTS} from '../queries/clientQueries'
import { DataGridPro } from '@mui/x-data-grid-pro';



export default function Clients() {
    
    const { loading, error, data} = useQuery(GET_CLIENTS)

    if (loading) return <Spinner/>
    if(error) return <p>Something went wrong</p>


    return (<>

      {!loading && !error &&  (
        <table className={styles.table}> 
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                { data.clients.map(client => (
                    <ClientRow key={client.id} client={client}/>
                    
                ))}
            </tbody>
      

        </table>
      )}
    </>
      
    
            
    )
}
